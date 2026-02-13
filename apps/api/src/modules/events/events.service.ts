import { Injectable } from "@nestjs/common";
import { EventType,Prisma } from "@prisma/client";

import { PrismaService } from "@/prisma/prisma.service";

interface LogEventInput {
  type: EventType;
  coupleId: string;
  actorUserId?: string;
  payload?: Record<string, unknown>;
}

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async log(input: LogEventInput) {
    return this.prisma.event.create({
      data: {
        type: input.type,
        coupleId: input.coupleId,
        actorUserId: input.actorUserId,
        payload: (input.payload ?? {}) as Prisma.InputJsonValue
      }
    });
  }

  async listRecent(coupleId: string) {
    return this.prisma.event.findMany({
      where: { coupleId },
      orderBy: { createdAt: "desc" },
      take: 50
    });
  }
}
