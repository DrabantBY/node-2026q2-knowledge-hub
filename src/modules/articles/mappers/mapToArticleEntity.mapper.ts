import type { Prisma } from '@generated/client';
import { Article } from '../entities';

type PrismaArticle = Prisma.ArticleGetPayload<{ include: { tags: true } }>;

export const mapToArticle = (article: PrismaArticle): Article =>
  new Article({
    ...article,
    tags: article.tags.map(({ name }) => name),
    createdAt: article.createdAt.getTime(),
    updatedAt: article.updatedAt.getTime(),
  });
