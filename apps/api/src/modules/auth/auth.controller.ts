import { Body, Controller, Headers, Ip, Post, Req, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthProvider } from "@prisma/client";
import { Request } from "express";

import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { AuthService } from "@/modules/auth/auth.service";
import { LoginDto } from "@/modules/auth/dto/login.dto";
import { OauthDto } from "@/modules/auth/dto/oauth.dto";
import { RefreshDto } from "@/modules/auth/dto/refresh.dto";
import { RegisterDto } from "@/modules/auth/dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  register(@Body() dto: RegisterDto, @Ip() ip: string, @Headers("user-agent") userAgent?: string) {
    return this.authService.register(dto, ip ?? userAgent);
  }

  @Post("login")
  @Throttle({ default: { limit: 8, ttl: 60000 } })
  login(@Body() dto: LoginDto, @Ip() ip: string, @Headers("user-agent") userAgent?: string) {
    return this.authService.login(dto, ip, userAgent);
  }

  @Post("refresh")
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  refresh(@Body() dto: RefreshDto, @Headers("user-agent") userAgent?: string, @Ip() ip?: string) {
    return this.authService.refresh(dto, userAgent, ip);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Body() dto: RefreshDto) {
    return this.authService.logout(dto.refreshToken);
  }

  @Post("oauth/google")
  oauthGoogle(@Body() dto: OauthDto) {
    return this.authService.oauthLogin(AuthProvider.GOOGLE, dto.idToken);
  }

  @Post("oauth/apple")
  oauthApple(@Body() dto: OauthDto) {
    return this.authService.oauthLogin(AuthProvider.APPLE, dto.idToken);
  }

  @Post("session")
  @UseGuards(JwtAuthGuard)
  session(@Req() req: Request) {
    return req.user;
  }
}
