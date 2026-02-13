import { Controller, Get, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { LevelsService } from "@/modules/levels/levels.service";

@Controller("levels")
@UseGuards(JwtAuthGuard)
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get("couple")
  getProgress(@CurrentUser() user: JwtPayloadUser) {
    return this.levelsService.getProgress(user.coupleId!);
  }
}
