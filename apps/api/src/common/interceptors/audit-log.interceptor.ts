import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import type { Request } from "express";
import { Observable, tap } from "rxjs";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request & { user?: { sub?: string } }>();

    return next.handle().pipe(
      tap(async () => {
        if (!req.route?.path) {
          return;
        }

        await this.prisma.auditLog.create({
          data: {
            userId: req.user?.sub,
            action: "REQUEST",
            resource: req.route.path,
            method: req.method,
            path: req.originalUrl,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"]
          }
        });
      })
    );
  }
}
