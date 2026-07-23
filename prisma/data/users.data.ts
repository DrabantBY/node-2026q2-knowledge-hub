import { Role } from '@generated/enums';

export const USERS_DATA = [
  { login: 'admin', password: 'admin', role: Role.ADMIN },
  { login: 'editor', password: 'editor', role: Role.EDITOR },
  { login: 'viewer', password: 'viewer', role: Role.VIEWER },
];
