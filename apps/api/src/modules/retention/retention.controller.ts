import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RetentionService } from "@/modules/retention/retention.service";

@Controller("retention")
@UseGuards(JwtAuthGuard)
export class RetentionController {
  constructor(private readonly retentionService: RetentionService) {}

  @Get("notifications")
  list(@CurrentUser() user: JwtPayloadUser) {
    return this.retentionService.listUserNotifications(user.sub);
  }

  @Patch("notifications/:notificationId/read")
  read(@CurrentUser() user: JwtPayloadUser, @Param("notificationId") notificationId: string) {
    return this.retentionService.markAsRead(user.sub, notificationId);
  }
}
