// import { randomUUID } from 'node:crypto';
// import type { PaginationResponse } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';

import type {
  // ArticleSearchParamsDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';
import type { Article } from './entities';
import { mapToArticle } from './mappers';

@Injectable()
export class ArticlesService {
  constructor(private prismaService: PrismaService) {}

  // async fetchAll({
  //   status,
  //   categoryId,
  //   tag,
  //   order,
  //   sortBy,
  //   limit,
  //   page,
  // }: ArticleSearchParamsDto): Promise<PaginationResponse<Article>> {
  //   const list = this.store.filter(
  //     (article) =>
  //       (!status || article.status === status) &&
  //       (!categoryId || article.categoryId === categoryId) &&
  //       (!tag || article.tags.includes(tag)),
  //   );
  //   this.sortBySearchParams(list, sortBy, order);
  //   return this.mapToPagination(list, page, limit);
  // }

  async fetchOne(id: string): Promise<Article> {
    const article = await this.prismaService.article.findUnique({
      where: { id },
      include: { tags: true },
    });
    if (!article) {
      throw new NotFoundException(idNotFoundMessage('Article'));
    }
    return mapToArticle(article);
  }

  async insertOne({ tags, ...other }: CreateArticleDto): Promise<Article> {
    const article = await this.prismaService.article.create({
      data: {
        ...other,
        tags: tags
          ? {
              connectOrCreate: tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
      },
      include: { tags: true },
    });

    return mapToArticle(article);
  }

  async updateOne(
    id: string,
    { tags, ...other }: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.prismaService.article.update({
      where: { id },
      data: tags
        ? {
            ...other,
            tags: {
              set: [],
              connectOrCreate: tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            },
          }
        : other,
      include: { tags: true },
    });

    return mapToArticle(article);
  }

  async deleteOne(id: string): Promise<void> {
    await this.prismaService.article.delete({ where: { id } });
  }
}
