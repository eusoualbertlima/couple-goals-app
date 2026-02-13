import { Module } from "@nestjs/common";

import { EventsModule } from "@/modules/events/events.module";
import { LevelsController } from "@/modules/levels/levels.controller";
import { LevelsService } from "@/modules/levels/levels.service";

@Module({
  imports: [EventsModule],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService]
})
export class LevelsModule {}
