import { Module } from "@nestjs/common";

import { EventsModule } from "@/modules/events/events.module";
import { HabitsController } from "@/modules/habits/habits.controller";
import { HabitsService } from "@/modules/habits/habits.service";
import { LevelsModule } from "@/modules/levels/levels.module";
import { StreaksModule } from "@/modules/streaks/streaks.module";

@Module({
  imports: [EventsModule, StreaksModule, LevelsModule],
  controllers: [HabitsController],
  providers: [HabitsService],
  exports: [HabitsService]
})
export class HabitsModule {}
