import { Module } from "@nestjs/common";

import { EventsController } from "@/modules/events/events.controller";
import { EventsService } from "@/modules/events/events.service";

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
