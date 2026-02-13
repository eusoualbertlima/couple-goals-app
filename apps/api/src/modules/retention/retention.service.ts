import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class RetentionService {
  constructor(private readonly prisma: PrismaService) {}

  async listUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30
    });
  }

  async markAsRead(userId: string, notificationId: string) {
    return this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { readAt: new Date() }
    });
  }

  @Cron("0 9 * * *")
  async runDailyRetentionSignals() {
    const couples = await this.prisma.couple.findMany({
      include: {
        members: true
      }
    });

    for (const couple of couples) {
      const today = new Date();
      const weekRef = this.currentWeekRef(today);
      const [streak, goals] = await Promise.all([
        this.prisma.coupleStreak.findUnique({ where: { coupleId: couple.id } }),
        this.prisma.goal.findMany({
          where: { coupleId: couple.id, scope: "SEMANAL", completedAt: null }
        })
      ]);

      const riskMessage =
        (streak?.currentDays ?? 0) > 0
          ? "A streak conjunta esta sob risco hoje. Uma conclusao coordenada preserva o ciclo."
          : "Inicie hoje a reconstrucao da streak conjunta para recuperar tracao.";

      const nearGoalMessage =
        goals.length > 0
          ? `Existem ${goals.length} metas semanais proximas da conclusao. Priorize o bloco final.`
          : "As metas semanais estao saudaveis. Mantenham a regularidade.";

      for (const member of couple.members) {
        await this.prisma.notification.createMany({
          data: [
            {
              userId: member.userId,
              coupleId: couple.id,
              type: "STREAK_RISK",
              title: "Risco de quebra de streak",
              message: riskMessage,
              actionUrl: "/habits"
            },
            {
              userId: member.userId,
              coupleId: couple.id,
              type: "NEAR_GOAL",
              title: "Meta quase concluida",
              message: nearGoalMessage,
              actionUrl: "/goals"
            },
            {
              userId: member.userId,
              coupleId: couple.id,
              type: "POSITIVE_FEEDBACK",
              title: "Feedback positivo inteligente",
              message: `A evolucao da semana ${weekRef} reforca o compromisso de longo prazo.`,
              actionUrl: "/dashboard"
            }
          ]
        });
      }
    }
  }

  private currentWeekRef(date: Date) {
    const year = date.getUTCFullYear();
    const start = new Date(Date.UTC(year, 0, 1));
    const days = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
    const week = Math.ceil((days + start.getUTCDay() + 1) / 7)
      .toString()
      .padStart(2, "0");
    return `${year}-W${week}`;
  }
}
