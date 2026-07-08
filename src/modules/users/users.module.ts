import { ArticlesModule } from '@articles/articles.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ArticlesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
