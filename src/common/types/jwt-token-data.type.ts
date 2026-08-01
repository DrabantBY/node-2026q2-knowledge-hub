import type { Role } from '@generated/enums';

export interface JwtTokenData {
  userId: string;
  login: string;
  role: Role;
}
