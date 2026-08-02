import type { Role } from '@generated/enums';

export interface UserPayload {
  userId: string;
  login: string;
  role: Role;
}
