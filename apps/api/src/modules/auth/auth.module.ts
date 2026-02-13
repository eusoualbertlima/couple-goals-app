import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "@/modules/auth/auth.controller";
import { AuthService } from "@/modules/auth/auth.service";
import { AppleStrategy } from "@/modules/auth/strategies/apple.strategy";
import { GoogleStrategy } from "@/modules/auth/strategies/google.strategy";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { EventsModule } from "@/modules/events/events.module";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    EventsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
        signOptions: { expiresIn: "15m" }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, AppleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
