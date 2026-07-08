import { Injectable, type NestMiddleware } from '@nestjs/common';

import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use({ method, originalUrl, ip }: Request, _: Response, next: NextFunction) {
    console.log(
      `[Request Log]: [Method: ${method} | Url: ${originalUrl} | Ip: ${ip}]`,
    );
    next();
  }
}
