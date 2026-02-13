import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class TreeService {
  constructor(private readonly prisma: PrismaService) {}

  async getState(coupleId: string) {
    const state = await this.prisma.treeState.findUnique({
      where: { coupleId },
      include: {
        unlocks: true,
        equippedItems: {
          include: { storeItem: true }
        }
      }
    });

    if (!state) {
      return this.prisma.treeState.create({
        data: { coupleId },
        include: { unlocks: true, equippedItems: { include: { storeItem: true } } }
      });
    }

    return state;
  }

  async recalculate(coupleId: string) {
    const [completionCount, completedGoals, streak] = await Promise.all([
      this.prisma.habitCompletion.count({ where: { coupleId } }),
      this.prisma.goal.count({ where: { coupleId, completedAt: { not: null }, isShared: true } }),
      this.prisma.coupleStreak.findUnique({ where: { coupleId } })
    ]);

    const rootPower = Math.min(100, Math.floor(completionCount / 5));
    const branchGrowth = Math.min(100, streak?.currentDays ?? 0);
    const flowerUnlocks = Math.min(100, completedGoals * 5);
    const synchronizedDays = streak?.perfectSyncDays ?? 0;

    const state = await this.prisma.treeState.upsert({
      where: { coupleId },
      create: {
        coupleId,
        rootPower,
        branchGrowth,
        flowerUnlocks,
        synchronizedRhythmActive: synchronizedDays >= 14,
        synchronizedDays,
        backgroundEffectUntil: synchronizedDays >= 14 ? new Date(Date.now() + 7 * 86_400_000) : null
      },
      update: {
        rootPower,
        branchGrowth,
        flowerUnlocks,
        synchronizedRhythmActive: synchronizedDays >= 14,
        synchronizedDays,
        backgroundEffectUntil: synchronizedDays >= 14 ? new Date(Date.now() + 7 * 86_400_000) : null
      }
    });

    const milestones = [
      { key: "LEAF_SPECIAL", requiredDays: 7 },
      { key: "NEW_BRANCH", requiredDays: 30 },
      { key: "RARE_SPECIES", requiredDays: 90 },
      { key: "LEGENDARY_TREE", requiredDays: 180 }
    ];

    for (const milestone of milestones) {
      const already = await this.prisma.treeUnlock.findFirst({
        where: { coupleId, key: milestone.key }
      });
      if (!already) {
        await this.prisma.treeUnlock.create({
          data: {
            coupleId,
            treeStateId: state.id,
            key: milestone.key,
            requiredDays: milestone.requiredDays,
            unlockedAt: synchronizedDays >= milestone.requiredDays ? new Date() : null
          }
        });
      } else if (!already.unlockedAt && synchronizedDays >= milestone.requiredDays) {
        await this.prisma.treeUnlock.update({
          where: { id: already.id },
          data: { unlockedAt: new Date() }
        });
      }
    }

    return this.getState(coupleId);
  }
}
