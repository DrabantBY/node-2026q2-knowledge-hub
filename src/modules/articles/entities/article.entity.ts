import type { ArticleStatus } from '../const';

export class Article {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
  authorId: string | null;
  categoryId: string | null;
  tags: string[];
  createdAt: number;
  updatedAt: number;

  constructor(data: Partial<Article>) {
    Object.assign(this, data);
  }
}
