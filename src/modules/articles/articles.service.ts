import type { PaginationResponse } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import { Prisma } from '@generated/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';

import type {
  ArticleSearchParamsDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dto';
import { Article } from './entities';

type PrismaArticle = Prisma.ArticleGetPayload<{ include: { tags: true } }>;

@Injectable()
export class ArticlesService {
  private INCLUDE = { tags: true };

  constructor(private prismaService: PrismaService) {}

  async fetchAll({
    status,
    categoryId,
    tag,
    order,
    sortBy,
    limit,
    page,
  }: ArticleSearchParamsDto): Promise<PaginationResponse<Article>> {
    const where: Prisma.ArticleWhereInput = {
      status,
      categoryId,
      tags: tag ? { some: { name: tag } } : undefined,
    };

    const orderBy: Prisma.ArticleOrderByWithRelationInput | undefined =
      sortBy && order ? { [sortBy]: order } : undefined;

    const [prismaArticles, total] = await this.prismaService.$transaction([
      this.prismaService.article.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: this.INCLUDE,
      }),
      this.prismaService.article.count({ where }),
    ]);

    return {
      data: prismaArticles.map(this.mapToArticle),
      page,
      limit,
      total,
    };
  }

  async fetchOne(id: string): Promise<Article> {
    const article = await this.prismaService.article.findUnique({
      where: { id },
      include: this.INCLUDE,
    });

    if (!article) throw new NotFoundException(idNotFoundMessage('Article'));

    return this.mapToArticle(article);
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
      include: this.INCLUDE,
    });

    return this.mapToArticle(article);
  }

  async updateOne(
    id: string,
    { tags, ...other }: UpdateArticleDto,
  ): Promise<Article> {
    try {
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
        include: this.INCLUDE,
      });

      return this.mapToArticle(article);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException(idNotFoundMessage('Article'));
      else throw err;
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.prismaService.article.delete({ where: { id } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException(idNotFoundMessage('Article'));
      else throw err;
    }
  }

  private mapToArticle(article: PrismaArticle): Article {
    return new Article({
      ...article,
      tags: article.tags.map(({ name }) => name),
      createdAt: article.createdAt.getTime(),
      updatedAt: article.updatedAt.getTime(),
    });
  }
}
