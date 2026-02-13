import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import type { Cache } from "cache-manager";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  async weeklyDashboard(coupleId: string) {
    const weekRef = this.currentWeekRef();
    const cacheKey = `analytics:weekly:${coupleId}:${weekRef}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const [snapshot, habitCountsByCategory, completions] = await Promise.all([
      this.prisma.analyticsSnapshot.findUnique({
        where: {
          coupleId_weekRef: {
            coupleId,
            weekRef
          }
        }
      }),
      this.prisma.habit.groupBy({
        by: ["category"],
        where: { coupleId },
        _count: true
      }),
      this.prisma.habitCompletion.count({
        where: { coupleId, weekRef }
      })
    ]);

    const output = {
      weekRef,
      snapshot,
      completions,
      categoryDistribution: habitCountsByCategory,
      consistencyCurve: await this.consistencyCurve(coupleId)
    };

    await this.cache.set(cacheKey, output, 60 * 60 * 1000);
    return output;
  }

  async consistencyCurve(coupleId: string) {
    return this.prisma.analyticsSnapshot.findMany({
      where: { coupleId },
      orderBy: { generatedAt: "asc" },
      take: 12
    });
  }

  async refreshSnapshot(coupleId: string) {
    const weekRef = this.currentWeekRef();
    const [healthCount, productivityCount, totalHabits] = await Promise.all([
      this.prisma.habitCompletion.count({
        where: {
          coupleId,
          weekRef,
          habit: { category: "SAUDE" }
        }
      }),
      this.prisma.habitCompletion.count({
        where: {
          coupleId,
          weekRef,
          habit: { category: "PRODUTIVIDADE" }
        }
      }),
      this.prisma.habit.count({ where: { coupleId } })
    ]);

    const consistencyScore = Math.min(100, Math.round(((healthCount + productivityCount) / Math.max(1, totalHabits * 7)) * 100));
    const healthScore = Math.min(100, Math.round((healthCount / Math.max(1, totalHabits * 4)) * 100));
    const productivityScore = Math.min(100, Math.round((productivityCount / Math.max(1, totalHabits * 4)) * 100));
    const level = await this.prisma.coupleLevelProgress.findUnique({ where: { coupleId } });

    const data = await this.prisma.analyticsSnapshot.upsert({
      where: {
        coupleId_weekRef: {
          coupleId,
          weekRef
        }
      },
      create: {
        coupleId,
        weekRef,
        consistencyScore,
        healthScore,
        productivityScore,
        disciplineScore: level?.disciplineScore ?? 0,
        correlationMatrix: { generated: true }
      },
      update: {
        consistencyScore,
        healthScore,
        productivityScore,
        disciplineScore: level?.disciplineScore ?? 0,
        correlationMatrix: { generated: true }
      }
    });

    await this.cache.del(`analytics:weekly:${coupleId}:${weekRef}`);
    return data;
  }

  private currentWeekRef() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const start = new Date(Date.UTC(year, 0, 1));
    const days = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
    const week = Math.ceil((days + start.getUTCDay() + 1) / 7)
      .toString()
      .padStart(2, "0");
    return `${year}-W${week}`;
  }
}
