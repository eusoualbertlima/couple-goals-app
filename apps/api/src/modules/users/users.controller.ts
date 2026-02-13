import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ThemeMode } from "@prisma/client";
import { IsBoolean, IsEnum } from "class-validator";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { UsersService } from "@/modules/users/users.service";

class UpdatePreferencesDto {
  @IsEnum(ThemeMode)
  theme!: ThemeMode;

  @IsBoolean()
  motivationCardsEnabled!: boolean;
}

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async me(@CurrentUser() user: JwtPayloadUser) {
    return this.usersService.findById(user.sub);
  }

  @Patch("preferences")
  async updatePreferences(@CurrentUser() user: JwtPayloadUser, @Body() dto: UpdatePreferencesDto) {
    return this.usersService.updatePreferences(user.sub, dto.theme, dto.motivationCardsEnabled);
  }
}
