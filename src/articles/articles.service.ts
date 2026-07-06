import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_STATUS } from './const';
import type { CreateArticleDto, UpdateArticleDto } from './dto';
import { Article } from './entities';

@Injectable()
export class ArticlesService {
  #store: Article[] = [];

  fetchAll(): Article[] {
    return this.#store;
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
    const newArticle = { ...oldArticle, ...dto };

    this.#store = this.#store.map((article) =>
      article.id === oldArticle.id ? newArticle : article,
    );

    return newArticle;
  }

  deleteOne(id: string): void {
    const article = this.fetchOne(id);
    this.#store = this.#store.filter(({ id }) => article.id !== id);
  }
}
