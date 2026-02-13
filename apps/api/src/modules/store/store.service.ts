import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async listCatalog(coupleId: string) {
    await this.ensureSeeded();
    const [items, unlocks] = await Promise.all([
      this.prisma.storeItem.findMany({ where: { active: true }, orderBy: { createdAt: "asc" } }),
      this.prisma.storeUnlock.findMany({ where: { coupleId } })
    ]);

    const unlockedSet = new Set(unlocks.map((item) => item.storeItemId));
    return items.map((item) => ({
      ...item,
      unlocked: unlockedSet.has(item.id)
    }));
  }

  async unlock(coupleId: string, itemId: string) {
    const item = await this.prisma.storeItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException("Store item not found");
    }

    const [level, streak] = await Promise.all([
      this.prisma.coupleLevelProgress.findUnique({ where: { coupleId } }),
      this.prisma.coupleStreak.findUnique({ where: { coupleId } })
    ]);

    const currentScore = level?.disciplineScore ?? 0;
    const perfectDays = streak?.perfectSyncDays ?? 0;

    if (currentScore < item.requiredScore || perfectDays < item.requiredPerfectDays) {
      throw new ForbiddenException("Merit requirement not reached");
    }

    return this.prisma.storeUnlock.upsert({
      where: {
        coupleId_storeItemId: {
          coupleId,
          storeItemId: itemId
        }
      },
      create: {
        coupleId,
        storeItemId: itemId
      },
      update: {}
    });
  }

  async equip(coupleId: string, unlockId: string) {
    const unlock = await this.prisma.storeUnlock.findFirst({
      where: { id: unlockId, coupleId }
    });
    if (!unlock) {
      throw new NotFoundException("Unlock not found");
    }

    await this.prisma.storeUnlock.updateMany({
      where: { coupleId, equipped: true },
      data: { equipped: false }
    });

    const state = await this.prisma.treeState.findUnique({ where: { coupleId } });

    return this.prisma.storeUnlock.update({
      where: { id: unlock.id },
      data: {
        equipped: true,
        treeStateId: state?.id
      }
    });
  }

  private async ensureSeeded() {
    const count = await this.prisma.storeItem.count();
    if (count > 0) {
      return;
    }

    await this.prisma.storeItem.createMany({
      data: [
        {
          code: "leaf-bronze-veil",
          name: "Folhas de bronzo velado",
          category: "FOLHA",
          requirementLabel: "7 dias de streak conjunta perfeita",
          requiredScore: 80,
          requiredPerfectDays: 7
        },
        {
          code: "trunk-imperial",
          name: "Tronco denso imperial",
          category: "TRONCO",
          requirementLabel: "30 dias sem quebra conjunta",
          requiredScore: 220,
          requiredPerfectDays: 30
        },
        {
          code: "background-aurora",
          name: "Fundo Aurora Silenciosa",
          category: "FUNDO",
          requirementLabel: "Disciplina acima de 420",
          requiredScore: 420,
          requiredPerfectDays: 20
        },
        {
          code: "light-meridian",
          name: "Luz Ambiente Meridian",
          category: "LUZ",
          requirementLabel: "Check-ins semanais consistentes por 4 semanas",
          requiredScore: 300,
          requiredPerfectDays: 24
        }
      ]
    });
  }
}
