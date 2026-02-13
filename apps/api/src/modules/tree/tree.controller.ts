import { Controller, Get, Post, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { TreeService } from "@/modules/tree/tree.service";

@Controller("tree")
@UseGuards(JwtAuthGuard)
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get("state")
  getState(@CurrentUser() user: JwtPayloadUser) {
    return this.treeService.getState(user.coupleId!);
  }

  @Post("recalculate")
  recalculate(@CurrentUser() user: JwtPayloadUser) {
    return this.treeService.recalculate(user.coupleId!);
  }
}
