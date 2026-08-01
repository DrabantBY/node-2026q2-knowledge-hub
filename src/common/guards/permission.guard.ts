import type { Role } from '@generated/enums';
import { type CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../decorators';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndMerge<Role[]>(Permission, [
      context.getHandler(),
      context.getClass(),
    ]);

    return (
      !permission?.length ||
      permission.includes(context.switchToHttp().getRequest().user?.role)
    );
  }
}
