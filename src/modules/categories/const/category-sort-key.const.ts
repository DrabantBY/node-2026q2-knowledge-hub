import type { Category } from '../entities';

export const CATEGORY_SORT_KEY = {
  NAME: 'name',
  DESCRIPTION: 'description',
} satisfies Record<string, keyof Category>;
