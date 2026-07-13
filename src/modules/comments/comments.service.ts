import { randomUUID } from 'node:crypto';
import { ArticlesService } from '@articles/articles.service';
import { BaseEntityService } from '@common/services';
import type { PaginationResponse } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { CommentSearchParamsDto, CreateCommentDto } from './dto';
import { Comment } from './entities';

@Injectable()
export class CommentsService extends BaseEntityService<Comment> {
  constructor(
    @Inject(forwardRef(() => ArticlesService))
    private articlesService: ArticlesService,
  ) {
    super();
  }

  private store: Comment[] = [];

  async fetchList({
    articleId,
    sortBy,
    order,
    page,
    limit,
  }: CommentSearchParamsDto): Promise<PaginationResponse<Comment>> {
    const list = this.store.filter(
      (comment) => comment.articleId === articleId,
    );
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToPagination(list, page, limit);
  }

  async fetchOne(id: string): Promise<Comment> {
    const comment = this.store.find((comment) => comment.id === id);
    if (!comment) throw new NotFoundException(idNotFoundMessage('Comment'));
    return comment;
  }

  async insertOne(dto: CreateCommentDto): Promise<Comment> {
    const isArticleExist = await this.articlesService.hasArticleId(
      dto.articleId,
    );
    if (!isArticleExist)
      throw new UnprocessableEntityException(
        "Article id reference doesn't exist",
      );

    const comment = new Comment({
      id: randomUUID(),
      ...dto,
      authorId: dto.authorId ?? null,
      createdAt: Date.now(),
    });

    this.store.push(comment);
    return comment;
  }

  async deleteOne(id: string): Promise<void> {
    const comment = await this.fetchOne(id);
    this.store = this.store.filter(({ id }) => comment.id !== id);
  }

  async deleteById(id: string): Promise<void> {
    this.store = this.store.filter(
      ({ authorId, articleId }) => articleId !== id && authorId !== id,
    );
  }
}
