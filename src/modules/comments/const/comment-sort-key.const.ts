import type { Comment } from '../entities';

export const COMMENT_SORT_KEY = {
  CONTENT: 'content',
  CREATED: 'createdAt',
} satisfies Record<string, keyof Comment>;
