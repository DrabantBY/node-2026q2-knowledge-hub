import { LoggerMiddleware } from '@common/middlewares';
import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';

import {
  ArticlesModule,
  AuthModule,
  CategoriesModule,
  CommentsModule,
  UsersModule,
} from './modules';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    CategoriesModule,
    CommentsModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
