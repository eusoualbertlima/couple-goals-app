import { Module } from "@nestjs/common";

import { CheckinsController } from "@/modules/checkins/checkins.controller";
import { CheckinsService } from "@/modules/checkins/checkins.service";
import { EventsModule } from "@/modules/events/events.module";
import { LevelsModule } from "@/modules/levels/levels.module";

@Module({
  imports: [EventsModule, LevelsModule],
  controllers: [CheckinsController],
  providers: [CheckinsService],
  exports: [CheckinsService]
})
export class CheckinsModule {}
