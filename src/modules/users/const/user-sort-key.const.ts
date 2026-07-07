import type { User } from '../entities';

export const USER_SORT_KEY = {
  LOGIN: 'login',
  ROLE: 'role',
  CREATED: 'createdAt',
  UPDATED: 'updatedAt',
} satisfies Record<string, keyof User>;
