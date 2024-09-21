import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const now = new Date().toLocaleString();
    const { method, originalUrl } = req;

    console.log(`[${now}] ${method} ${originalUrl}`);

    next();
  }
}
