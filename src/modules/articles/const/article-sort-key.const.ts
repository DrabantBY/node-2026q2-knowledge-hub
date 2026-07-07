import type { Article } from '../entities';

export const ARTICLE_SORT_KEY = {
  TITLE: 'title',
  STATUS: 'status',
  CREATED: 'createdAt',
  UPDATED: 'updatedAt',
} satisfies Record<string, keyof Article>;
