import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-apple";

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, "apple") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>("APPLE_CLIENT_ID"),
      teamID: configService.getOrThrow<string>("APPLE_TEAM_ID"),
      keyID: configService.getOrThrow<string>("APPLE_KEY_ID"),
      callbackURL: "/api/auth/apple/callback",
      privateKeyString: configService.getOrThrow<string>("APPLE_PRIVATE_KEY")
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    idToken: string,
    profile: Record<string, unknown>,
    done: (error: unknown, user?: unknown) => void
  ) {
    done(null, { accessToken, refreshToken, idToken, profile });
  }
}
