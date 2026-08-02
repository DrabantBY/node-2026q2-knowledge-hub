import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { UserPayload } from '../types';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserPayload =>
    ctx.switchToHttp().getRequest()?.user,
);
