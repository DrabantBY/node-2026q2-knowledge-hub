import type { User } from '@common/entities';

export const USER_SORT_KEY = {
  LOGIN: 'login',
  ROLE: 'role',
  CREATED: 'createdAt',
  UPDATED: 'updatedAt',
} satisfies Record<string, keyof User>;
