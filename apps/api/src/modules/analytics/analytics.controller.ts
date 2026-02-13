import { Controller, Get, Post, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { AnalyticsService } from "@/modules/analytics/analytics.service";

@Controller("analytics")
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("weekly")
  weekly(@CurrentUser() user: JwtPayloadUser) {
    return this.analyticsService.weeklyDashboard(user.coupleId!);
  }

  @Post("refresh")
  refresh(@CurrentUser() user: JwtPayloadUser) {
    return this.analyticsService.refreshSnapshot(user.coupleId!);
  }
}
