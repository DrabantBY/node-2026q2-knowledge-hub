import { LoggerMiddleware } from '@common/middlewares';
import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';

import {
  ArticlesModule,
  CategoriesModule,
  CommentsModule,
  UsersModule,
} from './modules';

@Module({
  imports: [UsersModule, ArticlesModule, CategoriesModule, CommentsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
