import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { AuditLogInterceptor } from "@/common/interceptors/audit-log.interceptor";
import { TrimStringsPipe } from "@/common/pipes/trim-strings.pipe";
import { validateEnv } from "@/config/env.validation";
import { AnalyticsModule } from "@/modules/analytics/analytics.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { CheckinsModule } from "@/modules/checkins/checkins.module";
import { EventsModule } from "@/modules/events/events.module";
import { GoalsModule } from "@/modules/goals/goals.module";
import { HabitsModule } from "@/modules/habits/habits.module";
import { LevelsModule } from "@/modules/levels/levels.module";
import { RetentionModule } from "@/modules/retention/retention.module";
import { StoreModule } from "@/modules/store/store.module";
import { StreaksModule } from "@/modules/streaks/streaks.module";
import { TreeModule } from "@/modules/tree/tree.module";
import { UsersModule } from "@/modules/users/users.module";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60_000,
      max: 2000
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 120
      }
    ]),
    PrismaModule,
    EventsModule,
    AuthModule,
    UsersModule,
    HabitsModule,
    GoalsModule,
    CheckinsModule,
    StreaksModule,
    LevelsModule,
    TreeModule,
    StoreModule,
    AnalyticsModule,
    RetentionModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: TrimStringsPipe
    }
  ]
})
export class AppModule {}
