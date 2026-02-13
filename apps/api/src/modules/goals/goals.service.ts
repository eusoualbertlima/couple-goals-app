import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalScope } from "@prisma/client";
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

import { EventsService } from "@/modules/events/events.service";
import { LevelsService } from "@/modules/levels/levels.service";
import { PrismaService } from "@/prisma/prisma.service";

export class CreateGoalDto {
  @IsString()
  @MaxLength(140)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

  @IsEnum(GoalScope)
  scope!: GoalScope;

  @IsBoolean()
  isShared!: boolean;

  @IsInt()
  @Min(1)
  target!: number;
}

@Injectable()
export class GoalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService,
    private readonly levelsService: LevelsService
  ) {}

  async list(coupleId: string) {
    return this.prisma.goal.findMany({
      where: { coupleId },
      orderBy: { createdAt: "desc" }
    });
  }

  async create(coupleId: string, userId: string, dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        ...dto,
        coupleId,
        ownerUserId: dto.isShared ? null : userId
      }
    });
  }

  async advance(coupleId: string, userId: string, goalId: string, delta: number) {
    const goal = await this.prisma.goal.findFirst({ where: { id: goalId, coupleId } });
    if (!goal) {
      throw new NotFoundException("Goal not found");
    }

    const current = Math.min(goal.target, goal.current + delta);
    const completed = current >= goal.target;

    const updated = await this.prisma.goal.update({
      where: { id: goal.id },
      data: {
        current,
        completedAt: completed ? new Date() : goal.completedAt
      }
    });

    if (completed) {
      await this.eventsService.log({
        type: "CoupleGoalCompleted",
        coupleId,
        actorUserId: userId,
        payload: { goalId }
      });
      await this.levelsService.incrementDiscipline(coupleId, 15);
    }

    return updated;
  }
}
