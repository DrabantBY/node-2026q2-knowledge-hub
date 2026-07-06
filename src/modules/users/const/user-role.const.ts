export const USER_ROLE = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
