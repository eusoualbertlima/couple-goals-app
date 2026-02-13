import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import type { Cache } from "cache-manager";

import { EventsService } from "@/modules/events/events.service";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class StreaksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  async getCurrentCoupleStreak(coupleId: string) {
    const cacheKey = `streak:couple:${coupleId}`;
    const cached = await this.cache.get<number>(cacheKey);
    if (cached !== undefined && cached !== null) {
      return { currentDays: cached, source: "cache" };
    }

    const streak = await this.prisma.coupleStreak.findUnique({ where: { coupleId } });
    const currentDays = streak?.currentDays ?? 0;
    await this.cache.set(cacheKey, currentDays, 60 * 5 * 1000);
    return { currentDays, source: "db" };
  }

  async applyCompletion(coupleId: string, userId: string, habitId: string, completedAt: Date) {
    const streak = await this.prisma.userStreak.findFirst({
      where: { coupleId, userId, habitId }
    });

    const currentDays = this.calculateCurrentDays(streak?.lastCompletedAt, completedAt, streak?.currentDays ?? 0);
    const bestDays = Math.max(streak?.bestDays ?? 0, currentDays);
    const refs = this.calendarRefs(completedAt);

    if (streak) {
      await this.prisma.userStreak.update({
        where: { id: streak.id },
        data: {
          currentDays,
          bestDays,
          weeklyCount: refs.week,
          monthlyCount: refs.month,
          annualCount: refs.year,
          lastCompletedAt: completedAt
        }
      });
    } else {
      await this.prisma.userStreak.create({
        data: {
          userId,
          coupleId,
          habitId,
          currentDays,
          bestDays,
          weeklyCount: refs.week,
          monthlyCount: refs.month,
          annualCount: refs.year,
          lastCompletedAt: completedAt
        }
      });
    }

    const members = await this.prisma.coupleMember.findMany({
      where: { coupleId },
      select: { userId: true }
    });

    const completionsToday = await this.prisma.habitCompletion.findMany({
      where: {
        coupleId,
        habitId,
        completedAt: {
          gte: new Date(Date.UTC(completedAt.getUTCFullYear(), completedAt.getUTCMonth(), completedAt.getUTCDate(), 0, 0, 0)),
          lte: new Date(Date.UTC(completedAt.getUTCFullYear(), completedAt.getUTCMonth(), completedAt.getUTCDate(), 23, 59, 59))
        }
      },
      distinct: ["userId"]
    });

    const sharedCompleted = members.length > 1 && completionsToday.length >= members.length;
    const currentCouple = await this.prisma.coupleStreak.findUnique({ where: { coupleId } });
    const updatedCoupleCurrent = sharedCompleted
      ? this.calculateCurrentDays(currentCouple?.lastPerfectDate, completedAt, currentCouple?.currentDays ?? 0)
      : 0;

    await this.prisma.coupleStreak.upsert({
      where: { coupleId },
      create: {
        coupleId,
        currentDays: updatedCoupleCurrent,
        bestDays: Math.max(currentCouple?.bestDays ?? 0, updatedCoupleCurrent),
        weeklyCount: currentCouple?.weeklyCount ?? 0,
        monthlyCount: currentCouple?.monthlyCount ?? 0,
        annualCount: currentCouple?.annualCount ?? 0,
        perfectSyncDays: sharedCompleted ? (currentCouple?.perfectSyncDays ?? 0) + 1 : currentCouple?.perfectSyncDays ?? 0,
        lastPerfectDate: sharedCompleted ? completedAt : currentCouple?.lastPerfectDate
      },
      update: {
        currentDays: updatedCoupleCurrent,
        bestDays: Math.max(currentCouple?.bestDays ?? 0, updatedCoupleCurrent),
        perfectSyncDays: sharedCompleted ? (currentCouple?.perfectSyncDays ?? 0) + 1 : currentCouple?.perfectSyncDays ?? 0,
        lastPerfectDate: sharedCompleted ? completedAt : currentCouple?.lastPerfectDate
      }
    });

    if (!sharedCompleted && (currentCouple?.currentDays ?? 0) > 0) {
      await this.eventsService.log({
        type: "StreakBroken",
        coupleId,
        actorUserId: userId,
        payload: { habitId, reason: "shared-goal-not-completed-by-both" }
      });
    }

    await this.cache.set(`streak:couple:${coupleId}`, updatedCoupleCurrent, 60 * 5 * 1000);
  }

  private calculateCurrentDays(lastCompletion: Date | null | undefined, current: Date, oldValue: number): number {
    if (!lastCompletion) {
      return 1;
    }
    const diffDays = Math.floor((current.getTime() - lastCompletion.getTime()) / 86_400_000);
    if (diffDays <= 1) {
      return oldValue + 1;
    }
    return 1;
  }

  private calendarRefs(date: Date) {
    const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const days = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
    return {
      week: Math.ceil((days + start.getUTCDay() + 1) / 7),
      month: date.getUTCMonth() + 1,
      year: date.getUTCFullYear()
    };
  }
}
