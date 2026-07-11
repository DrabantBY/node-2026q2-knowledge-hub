import { ArticlesModule } from '@articles/articles.module';
import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [forwardRef(() => ArticlesModule)],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
