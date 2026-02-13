import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface JwtPayloadUser {
  sub: string;
  email: string;
  coupleId?: string;
}

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): JwtPayloadUser | null => {
  const request = ctx.switchToHttp().getRequest();
  return request.user ?? null;
});
