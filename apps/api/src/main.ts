import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import helmet from "helmet";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: [/localhost:\d+$/],
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  app.use((req: Request, res: Response, next: () => void) => {
    req.body = sanitizePayload(req.body);
    next();
  });

  await app.listen(4000);
}

function sanitizePayload(payload: unknown): unknown {
  if (typeof payload === "string") {
    return payload.replace(/[<>]/g, "").trim();
  }
  if (Array.isArray(payload)) {
    return payload.map(sanitizePayload);
  }
  if (payload && typeof payload === "object") {
    const entries = Object.entries(payload).map(([key, value]) => [key, sanitizePayload(value)]);
    return Object.fromEntries(entries);
  }
  return payload;
}

void bootstrap();
