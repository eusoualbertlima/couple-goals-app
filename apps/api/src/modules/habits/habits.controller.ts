import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { CurrentUser, type JwtPayloadUser } from "@/common/guards/current-user.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CompleteHabitDto } from "@/modules/habits/dto/complete-habit.dto";
import { CreateHabitDto } from "@/modules/habits/dto/create-habit.dto";
import { HabitsService } from "@/modules/habits/habits.service";

@Controller("habits")
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  async list(@CurrentUser() user: JwtPayloadUser) {
    return this.habitsService.list(user.coupleId!, user.sub);
  }

  @Post()
  async create(@CurrentUser() user: JwtPayloadUser, @Body() dto: CreateHabitDto) {
    return this.habitsService.create(user.coupleId!, user.sub, dto);
  }

  @Patch(":habitId/focus")
  async focus(@CurrentUser() user: JwtPayloadUser, @Param("habitId") habitId: string) {
    return this.habitsService.setFocus(user.coupleId!, habitId);
  }

  @Post(":habitId/complete")
  async complete(
    @CurrentUser() user: JwtPayloadUser,
    @Param("habitId") habitId: string,
    @Body() dto: CompleteHabitDto
  ) {
    return this.habitsService.complete(user.coupleId!, user.sub, habitId, dto.completedAt);
  }
}
