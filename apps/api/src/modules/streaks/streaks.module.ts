import { Module } from "@nestjs/common";

import { EventsModule } from "@/modules/events/events.module";
import { StreaksController } from "@/modules/streaks/streaks.controller";
import { StreaksService } from "@/modules/streaks/streaks.service";

@Module({
  imports: [EventsModule],
  controllers: [StreaksController],
  providers: [StreaksService],
  exports: [StreaksService]
})
export class StreaksModule {}
