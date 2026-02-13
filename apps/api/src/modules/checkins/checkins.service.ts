import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { EventsService } from "@/modules/events/events.service";
import { LevelsService } from "@/modules/levels/levels.service";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class CheckinsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService,
    private readonly levelsService: LevelsService
  ) {}

  async getCurrent(coupleId: string) {
    const weekRef = this.currentWeekRef();
    const checkin = await this.prisma.weeklyCheckin.findUnique({
      where: {
        coupleId_weekRef: {
          coupleId,
          weekRef
        }
      }
    });

    if (checkin) {
      return checkin;
    }

    return this.generateForCouple(coupleId, weekRef);
  }

  async complete(coupleId: string, userId: string) {
    const weekRef = this.currentWeekRef();
    const current = await this.getCurrent(coupleId);
    const updated = await this.prisma.weeklyCheckin.update({
      where: { id: current.id },
      data: {
        completedByUserId: userId,
        completedAt: new Date()
      }
    });

    await this.eventsService.log({
      type: "WeeklyCheckinCompleted",
      coupleId,
      actorUserId: userId,
      payload: { weekRef }
    });

    await this.levelsService.incrementDiscipline(coupleId, 12);
    return updated;
  }

  @Cron("0 7 * * 1")
  async generateWeeklyCheckins() {
    const weekRef = this.currentWeekRef();
    const couples = await this.prisma.couple.findMany({
      select: { id: true }
    });

    for (const couple of couples) {
      await this.generateForCouple(couple.id, weekRef);
    }
  }

  private async generateForCouple(coupleId: string, weekRef: string) {
    const existing = await this.prisma.weeklyCheckin.findUnique({
      where: {
        coupleId_weekRef: {
          coupleId,
          weekRef
        }
      }
    });

    if (existing) {
      return existing;
    }

    const [score, streak] = await Promise.all([
      this.prisma.coupleLevelProgress.findUnique({ where: { coupleId } }),
      this.prisma.coupleStreak.findUnique({ where: { coupleId } })
    ]);

    return this.prisma.weeklyCheckin.create({
      data: {
        coupleId,
        weekRef,
        individualSummaryA:
          "Parceiro A manteve estabilidade em habitos de saude e concluiu a maioria dos blocos profundos.",
        individualSummaryB:
          "Parceiro B evoluiu consistencia noturna e aumentou a taxa de conclusao dos habitos prioritarios.",
        coupleSummary: `Disciplina conjunta em ${Math.min(100, Math.round((score?.disciplineScore ?? 0) / 6))}% com streak atual de ${
          streak?.currentDays ?? 0
        } dias.`,
        improvements: "Melhor alinhamento de inicio de dia e maior previsibilidade de execucao.",
        failures: "Quedas pontuais em dias de pressao externa ainda impactam a constancia compartilhada.",
        reflectiveQuestion:
          "Qual decisao simples, tomada no domingo, aumenta a chance de cumprimento dos habitos da semana?"
      }
    });
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
