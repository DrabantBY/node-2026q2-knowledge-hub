import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { PublicRoute } from '../decorators';
import type { UserPayload } from '../types';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const publicRoute = this.reflector.getAllAndOverride<boolean>(PublicRoute, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (publicRoute) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getBearerToken(request);
    if (!token)
      throw new UnauthorizedException('Access token is invalid or expired');

    try {
      request['user'] = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Access token is invalid or expired');
    }
    return true;
  }

  private getBearerToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;
    const [scheme, token] = authHeader.split(/\s+/);
    return scheme === 'Bearer' ? token : null;
  }
}
