import { randomUUID } from "node:crypto";

import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash, verify } from "@node-rs/argon2";
import { AuthProvider, type CoupleMember, type User } from "@prisma/client";

import { LoginDto } from "@/modules/auth/dto/login.dto";
import { RefreshDto } from "@/modules/auth/dto/refresh.dto";
import { RegisterDto } from "@/modules/auth/dto/register.dto";
import { EventsService } from "@/modules/events/events.service";
import { PrismaService } from "@/prisma/prisma.service";

export interface SessionPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    coupleId?: string;
  };
}

@Injectable()
export class AuthService {
  private readonly accessTtl = "15m";
  private readonly refreshDays = 30;
  private readonly bruteForceLimit = 8;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly eventsService: EventsService
  ) {}

  async register(dto: RegisterDto, ipAddress?: string): Promise<SessionPayload> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) {
      throw new ConflictException("Email already in use");
    }

    const passwordHash = await hash(dto.password);
    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email.toLowerCase(),
          displayName: dto.displayName,
          passwordHash,
          provider: AuthProvider.EMAIL
        }
      });

      const couple = await tx.couple.create({
        data: {
          displayName: `${dto.displayName} Couple`,
          objective: "Construir disciplina conjunta e fortalecer constancia do casal.",
          weeklyCommitment: 5
        }
      });

      await tx.coupleMember.create({
        data: {
          coupleId: couple.id,
          userId: user.id,
          role: "FOUNDING_MEMBER"
        }
      });

      await tx.coupleLevelProgress.create({
        data: {
          coupleId: couple.id,
          disciplineScore: 0
        }
      });

      await tx.treeState.create({
        data: {
          coupleId: couple.id,
          rootPower: 0,
          branchGrowth: 0
        }
      });

      await tx.coupleStreak.create({
        data: {
          coupleId: couple.id
        }
      });

      return { user, coupleId: couple.id };
    });

    await this.registerAttempt(result.user.id, result.user.email, ipAddress, true);
    return this.issueSession(result.user, result.coupleId);
  }

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string): Promise<SessionPayload> {
    await this.ensureNotBlocked(dto.email.toLowerCase(), ipAddress);

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        memberships: true
      }
    });

    if (!user || !user.passwordHash) {
      await this.registerAttempt(undefined, dto.email.toLowerCase(), ipAddress, false);
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await verify(user.passwordHash, dto.password);
    if (!valid) {
      await this.registerAttempt(user.id, user.email, ipAddress, false);
      throw new UnauthorizedException("Invalid credentials");
    }

    await this.registerAttempt(user.id, user.email, ipAddress, true);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    const coupleId = user.memberships[0]?.coupleId;
    return this.issueSession(user, coupleId, userAgent, ipAddress);
  }

  async refresh(dto: RefreshDto, userAgent?: string, ipAddress?: string): Promise<SessionPayload> {
    const activeTokens = await this.prisma.refreshToken.findMany({
      where: {
        revokedAt: null,
        expiresAt: { gt: new Date() }
      },
      include: {
        user: {
          include: { memberships: true }
        }
      }
    });

    for (const token of activeTokens) {
      if (await verify(token.tokenHash, dto.refreshToken)) {
        await this.prisma.refreshToken.update({
          where: { id: token.id },
          data: { revokedAt: new Date() }
        });

        const coupleId = token.user.memberships[0]?.coupleId;
        return this.issueSession(token.user, coupleId, userAgent, ipAddress, token.id);
      }
    }

    throw new UnauthorizedException("Invalid refresh token");
  }

  async logout(refreshToken: string) {
    const activeTokens = await this.prisma.refreshToken.findMany({
      where: {
        revokedAt: null
      }
    });

    for (const token of activeTokens) {
      if (await verify(token.tokenHash, refreshToken)) {
        await this.prisma.refreshToken.update({
          where: { id: token.id },
          data: { revokedAt: new Date() }
        });
      }
    }

    return { ok: true };
  }

  async oauthLogin(provider: "GOOGLE" | "APPLE", idToken: string): Promise<SessionPayload> {
    // Token verification must be provider-native in production.
    const normalizedIdentity = idToken.slice(0, 18).replace(/[^a-z0-9]/gi, "").toLowerCase();
    const providerAccountId = `${provider}-${normalizedIdentity}`;
    const fakeEmail = `${normalizedIdentity}@${provider.toLowerCase()}.oauth.local`;

    const identity = await this.prisma.authIdentity.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId
        }
      },
      include: { user: { include: { memberships: true } } }
    });

    if (identity) {
      return this.issueSession(identity.user, identity.user.memberships[0]?.coupleId);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: fakeEmail,
          displayName: provider === AuthProvider.GOOGLE ? "Google User" : "Apple User",
          provider,
          providerUserId: providerAccountId
        }
      });

      await tx.authIdentity.create({
        data: {
          userId: user.id,
          provider,
          providerAccountId
        }
      });

      const couple = await tx.couple.create({
        data: {
          displayName: `${user.displayName} Couple`,
          objective: "Construir disciplina conjunta e fortalecer constancia do casal.",
          weeklyCommitment: 4
        }
      });

      await tx.coupleMember.create({
        data: {
          coupleId: couple.id,
          userId: user.id
        }
      });

      await tx.coupleLevelProgress.create({
        data: {
          coupleId: couple.id
        }
      });

      await tx.treeState.create({
        data: {
          coupleId: couple.id
        }
      });

      await tx.coupleStreak.create({
        data: {
          coupleId: couple.id
        }
      });

      return { user, coupleId: couple.id };
    });

    return this.issueSession(result.user, result.coupleId);
  }

  private async issueSession(
    user: User & { memberships?: CoupleMember[] },
    coupleId?: string,
    userAgent?: string,
    ipAddress?: string,
    rotatedFromId?: string
  ): Promise<SessionPayload> {
    const payload = {
      sub: user.id,
      email: user.email,
      coupleId
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.accessTtl
    });

    const rawRefresh = `${randomUUID()}-${randomUUID()}`;
    const refreshHash = await hash(rawRefresh);
    const expiresAt = new Date(Date.now() + this.refreshDays * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshHash,
        expiresAt,
        userAgent,
        ipAddress,
        rotatedFromId
      }
    });

    if (coupleId) {
      await this.eventsService.log({
        type: "LevelUnlocked",
        coupleId,
        actorUserId: user.id,
        payload: { reason: "session-issued" }
      });
    }

    return {
      accessToken,
      refreshToken: rawRefresh,
      expiresIn: this.accessTtl,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        coupleId
      }
    };
  }

  private async ensureNotBlocked(email: string, ipAddress?: string) {
    const periodStart = new Date(Date.now() - 15 * 60 * 1000);
    const failedAttempts = await this.prisma.authAttempt.count({
      where: {
        createdAt: { gte: periodStart },
        successful: false,
        OR: [{ email }, { ipAddress }]
      }
    });

    if (failedAttempts >= this.bruteForceLimit) {
      throw new HttpException("Too many attempts. Try again later.", HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  private async registerAttempt(
    userId: string | undefined,
    email: string,
    ipAddress: string | undefined,
    successful: boolean
  ) {
    await this.prisma.authAttempt.create({
      data: {
        userId,
        email,
        ipAddress,
        successful
      }
    });
  }
}
