import { Controller, Get, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { StreaksService } from "@/modules/streaks/streaks.service";

@Controller("streaks")
@UseGuards(JwtAuthGuard)
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get("couple/current")
  current(@CurrentUser() user: JwtPayloadUser) {
    return this.streaksService.getCurrentCoupleStreak(user.coupleId!);
  }
}
