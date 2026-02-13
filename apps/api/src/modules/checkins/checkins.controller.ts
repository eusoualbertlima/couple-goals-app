import { Controller, Get, Post, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CheckinsService } from "@/modules/checkins/checkins.service";

@Controller("checkins")
@UseGuards(JwtAuthGuard)
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Get("current")
  current(@CurrentUser() user: JwtPayloadUser) {
    return this.checkinsService.getCurrent(user.coupleId!);
  }

  @Post("complete")
  complete(@CurrentUser() user: JwtPayloadUser) {
    return this.checkinsService.complete(user.coupleId!, user.sub);
  }
}
