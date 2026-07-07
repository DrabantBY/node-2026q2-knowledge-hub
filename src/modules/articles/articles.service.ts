import { randomUUID } from 'node:crypto';
import { CommentsService } from '@comments/comments.service';
import { BaseEntityService } from '@common/services';
import type { FetchAllResponse } from '@common/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_STATUS } from './const';
import type {
  ArticleSearchParamsDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';
import { Article } from './entities';

@Injectable()
export class ArticlesService extends BaseEntityService<Article> {
  constructor(private commentService: CommentsService) {
    super();
  }

  #store: Article[] = [];

  fetchAll({
    status,
    categoryId,
    tag,
    order,
    sortBy,
    limit,
    page,
  }: ArticleSearchParamsDto): FetchAllResponse<Article[]> {
    const list = this.#store.filter(
      (article) =>
        (!status || article.status === status) &&
        (!categoryId || article.categoryId === categoryId) &&
        (!tag || article.tags.includes(tag)),
    );

    this.sortBySearchParams(list, sortBy, order);

    return this.mapToFetchAllResponse(list, page, limit);
  }

  fetchOne(id: string): Article {
    const article = this.#store.find((article) => article.id === id);
    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }
    return article;
  }

  insertOne(dto: CreateArticleDto): Article {
    const date = Date.now();

    const article = new Article({
      id: randomUUID(),
      ...dto,
      status: dto.status ?? ARTICLE_STATUS.DRAFT,
      authorId: dto.authorId ?? null,
      categoryId: dto.categoryId ?? null,
      tags: dto.tags ?? [],
      createdAt: date,
      updatedAt: date,
    });

    this.#store.push(article);
    return article;
  }

  updateOne(id: string, dto: UpdateArticleDto): Article {
    const oldArticle = this.fetchOne(id);
    const newArticle = { ...oldArticle, ...dto, updatedAt: Date.now() };

    this.#store = this.#store.map((article) =>
      article.id === oldArticle.id ? newArticle : article,
    );

    return newArticle;
  }

  deleteOne(id: string): void {
    const article = this.fetchOne(id);
    this.#store = this.#store.filter(({ id }) => article.id !== id);
    this.deleteComment(id);
  }

  resetAuthorId(id: string): void {
    const article = this.#store.find(({ authorId }) => authorId === id);
    if (!article) return;
    article.authorId = null;
    article.updatedAt = Date.now();
  }

  resetCategoryId(id: string): void {
    const article = this.#store.find(({ categoryId }) => categoryId === id);
    if (!article) return;
    article.categoryId = null;
    article.updatedAt = Date.now();
  }

  deleteComment(id: string): void {
    this.commentService.deleteById(id);
  }
}
