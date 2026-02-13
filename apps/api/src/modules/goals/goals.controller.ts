import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { IsInt, Min } from "class-validator";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CreateGoalDto, GoalsService } from "@/modules/goals/goals.service";

class AdvanceGoalDto {
  @IsInt()
  @Min(1)
  delta!: number;
}

@Controller("goals")
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  list(@CurrentUser() user: JwtPayloadUser) {
    return this.goalsService.list(user.coupleId!);
  }

  @Post()
  create(@CurrentUser() user: JwtPayloadUser, @Body() dto: CreateGoalDto) {
    return this.goalsService.create(user.coupleId!, user.sub, dto);
  }

  @Patch(":goalId/advance")
  advance(
    @CurrentUser() user: JwtPayloadUser,
    @Param("goalId") goalId: string,
    @Body() dto: AdvanceGoalDto
  ) {
    return this.goalsService.advance(user.coupleId!, user.sub, goalId, dto.delta);
  }
}
