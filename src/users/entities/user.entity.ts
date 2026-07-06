import { Exclude } from 'class-transformer';
import type { UserRole } from '../const';

export class User {
  id: string;
  login: string;
  role: UserRole;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
