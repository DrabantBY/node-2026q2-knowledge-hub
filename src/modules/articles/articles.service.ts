import { randomUUID } from 'node:crypto';
import { CommentsService } from '@comments/comments.service';
import { BaseEntityService } from '@common/services';
import type { PaginationResponse } from '@common/types';
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

  async fetchAll({
    status,
    categoryId,
    tag,
    order,
    sortBy,
    limit,
    page,
  }: ArticleSearchParamsDto): Promise<PaginationResponse<Article>> {
    const list = this.#store.filter(
      (article) =>
        (!status || article.status === status) &&
        (!categoryId || article.categoryId === categoryId) &&
        (!tag || article.tags.includes(tag)),
    );
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToPagination(list, page, limit);
  }

  async fetchOne(id: string): Promise<Article> {
    const article = this.#store.find((article) => article.id === id);
    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }
    return article;
  }

  async insertOne(dto: CreateArticleDto): Promise<Article> {
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

  async updateOne(id: string, dto: UpdateArticleDto): Promise<Article> {
    const oldArticle = await this.fetchOne(id);
    const newArticle = { ...oldArticle, ...dto, updatedAt: Date.now() };
    this.#store = this.#store.map((article) =>
      article.id === oldArticle.id ? newArticle : article,
    );
    return newArticle;
  }

  async deleteOne(id: string): Promise<void> {
    const article = await this.fetchOne(id);
    this.#store = this.#store.filter(({ id }) => article.id !== id);
    await this.deleteComment(id);
  }

  async resetAuthorId(id: string): Promise<void> {
    const article = this.#store.find(({ authorId }) => authorId === id);
    if (!article) return;
    article.authorId = null;
    article.updatedAt = Date.now();
  }

  async resetCategoryId(id: string): Promise<void> {
    const article = this.#store.find(({ categoryId }) => categoryId === id);
    if (!article) return;
    article.categoryId = null;
    article.updatedAt = Date.now();
  }

  async deleteComment(id: string): Promise<void> {
    this.commentService.deleteById(id);
  }
}
