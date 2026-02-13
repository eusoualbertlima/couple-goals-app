import { Injectable, NotFoundException } from "@nestjs/common";
import { ThemeMode } from "@prisma/client";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: true
      }
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async updatePreferences(userId: string, theme: ThemeMode, motivationCardsEnabled: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { theme, motivationCardsEnabled }
    });
  }
}
