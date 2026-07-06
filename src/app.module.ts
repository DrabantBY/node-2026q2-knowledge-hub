import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ArticlesModule,
  CategoriesModule,
  CommentsModule,
  UsersModule,
} from './modules';

@Module({
  imports: [UsersModule, ArticlesModule, CategoriesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
