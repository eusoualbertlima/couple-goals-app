import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { EventsService } from "@/modules/events/events.service";

@Controller("events")
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async list(@Query("coupleId") coupleId: string) {
    return this.eventsService.listRecent(coupleId);
  }
}
