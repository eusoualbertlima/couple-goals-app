import { Module } from "@nestjs/common";

import { EventsModule } from "@/modules/events/events.module";
import { GoalsController } from "@/modules/goals/goals.controller";
import { GoalsService } from "@/modules/goals/goals.service";
import { LevelsModule } from "@/modules/levels/levels.module";

@Module({
  imports: [EventsModule, LevelsModule],
  controllers: [GoalsController],
  providers: [GoalsService],
  exports: [GoalsService]
})
export class GoalsModule {}
