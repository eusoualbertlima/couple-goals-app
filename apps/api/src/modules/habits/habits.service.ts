import { Injectable, NotFoundException } from "@nestjs/common";
import { HabitVisibility } from "@prisma/client";

import { EventsService } from "@/modules/events/events.service";
import { CreateHabitDto } from "@/modules/habits/dto/create-habit.dto";
import { LevelsService } from "@/modules/levels/levels.service";
import { StreaksService } from "@/modules/streaks/streaks.service";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class HabitsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService,
    private readonly streaksService: StreaksService,
    private readonly levelsService: LevelsService
  ) {}

  async list(coupleId: string, userId: string) {
    return this.prisma.habit.findMany({
      where: {
        coupleId,
        OR: [{ visibility: HabitVisibility.COMPARTILHADO }, { ownerUserId: userId }]
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async create(coupleId: string, userId: string, dto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        ...dto,
        coupleId,
        ownerUserId: dto.visibility === HabitVisibility.PRIVADO ? userId : null
      }
    });
  }

  async setFocus(coupleId: string, habitId: string) {
    await this.prisma.habit.updateMany({
      where: { coupleId },
      data: { isFocusOfDay: false }
    });

    const habit = await this.prisma.habit.findFirst({
      where: { id: habitId, coupleId }
    });
    if (!habit) {
      throw new NotFoundException("Habit not found");
    }

    return this.prisma.habit.update({
      where: { id: habit.id },
      data: { isFocusOfDay: true }
    });
  }

  async complete(coupleId: string, userId: string, habitId: string, completedAtInput?: string) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        coupleId
      }
    });

    if (!habit) {
      throw new NotFoundException("Habit not found");
    }

    const completedAt = completedAtInput ? new Date(completedAtInput) : new Date();
    const refs = this.getCalendarRefs(completedAt);

    const completion = await this.prisma.habitCompletion.create({
      data: {
        habitId,
        coupleId,
        userId,
        completedAt,
        weekRef: refs.weekRef,
        monthRef: refs.monthRef,
        yearRef: refs.yearRef
      }
    });

    await this.streaksService.applyCompletion(coupleId, userId, habitId, completedAt);
    await this.levelsService.incrementDiscipline(coupleId, 6);
    await this.eventsService.log({
      type: "HabitCompleted",
      coupleId,
      actorUserId: userId,
      payload: { habitId, completedAt: completedAt.toISOString() }
    });

    return completion;
  }

  private getCalendarRefs(date: Date) {
    const yearRef = date.getUTCFullYear();
    const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
    const monthRef = `${yearRef}-${month}`;
    const start = new Date(Date.UTC(yearRef, 0, 1));
    const days = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
    const weekRef = `${yearRef}-W${Math.ceil((days + start.getUTCDay() + 1) / 7)
      .toString()
      .padStart(2, "0")}`;

    return { weekRef, monthRef, yearRef };
  }
}
