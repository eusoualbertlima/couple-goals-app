import { Injectable } from "@nestjs/common";
import { CoupleLevel } from "@prisma/client";

import { EventsService } from "@/modules/events/events.service";
import { PrismaService } from "@/prisma/prisma.service";

const COUPLE_LEVEL_RULES: Array<{ key: CoupleLevel; minDisciplineScore: number }> = [
  { key: CoupleLevel.INICIANTES, minDisciplineScore: 0 },
  { key: CoupleLevel.CONSTANTES, minDisciplineScore: 140 },
  { key: CoupleLevel.EVOLUINDO, minDisciplineScore: 280 },
  { key: CoupleLevel.DISCIPLINADOS, minDisciplineScore: 430 },
  { key: CoupleLevel.MESTRES_DA_CONSTANCIA, minDisciplineScore: 620 }
];

@Injectable()
export class LevelsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService
  ) {}

  async getProgress(coupleId: string) {
    const progress = await this.prisma.coupleLevelProgress.findUnique({
      where: { coupleId }
    });

    if (!progress) {
      return this.prisma.coupleLevelProgress.create({
        data: { coupleId }
      });
    }

    return progress;
  }

  async incrementDiscipline(coupleId: string, points: number) {
    const current = await this.getProgress(coupleId);
    const disciplineScore = Math.min(9999, current.disciplineScore + points);
    const level = this.resolveLevel(disciplineScore);

    const updated = await this.prisma.coupleLevelProgress.update({
      where: { id: current.id },
      data: {
        disciplineScore,
        currentLevel: level,
        lastUnlockedAt: level !== current.currentLevel ? new Date() : current.lastUnlockedAt
      }
    });

    if (updated.currentLevel !== current.currentLevel) {
      await this.eventsService.log({
        type: "LevelUnlocked",
        coupleId,
        payload: { level: updated.currentLevel, score: updated.disciplineScore }
      });
    }

    return updated;
  }

  private resolveLevel(score: number): CoupleLevel {
    const rule =
      [...COUPLE_LEVEL_RULES].reverse().find((item) => score >= item.minDisciplineScore) ??
      COUPLE_LEVEL_RULES[0];
    return rule.key;
  }
}
