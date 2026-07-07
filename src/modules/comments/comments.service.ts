import { randomUUID } from 'node:crypto';
import { BaseEntityService } from '@common/services';
import type { FetchAllResponse } from '@common/types';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { CommentSearchParamsDto, CreateCommentDto } from './dto';
import { Comment } from './entities';

@Injectable()
export class CommentsService extends BaseEntityService<Comment> {
  #store: Comment[] = [];

  fetchList({
    articleId,
    sortBy,
    order,
    page,
    limit,
  }: CommentSearchParamsDto): FetchAllResponse<Comment[]> {
    const list = this.#store.filter(
      (comment) => comment.articleId === articleId,
    );

    if (list.length === 0)
      throw new UnprocessableEntityException(
        "ArticleId reference doesn't exist",
      );

    this.sortBySearchParams(list, sortBy, order);
    return this.mapToFetchAllResponse(list, page, limit);
  }

  insertOne(dto: CreateCommentDto): Comment {
    const comment = new Comment({
      id: randomUUID(),
      ...dto,
      authorId: dto.authorId ?? null,
      createdAt: Date.now(),
    });
    this.#store.push(comment);

    return comment;
  }

  deleteOne(id: string): void {
    const isExist = this.#store.some((comment) => comment.id === id);
    if (!isExist) {
      throw new NotFoundException("Comment doesn't exist");
    }
    this.#store = this.#store.filter((comment) => comment.id !== id);
  }

  deleteById(id: string): void {
    this.#store = this.#store.filter(
      ({ authorId, articleId }) => authorId !== id || articleId !== id,
    );
  }
}
