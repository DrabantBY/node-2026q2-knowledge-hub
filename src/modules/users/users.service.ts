import { randomUUID } from 'node:crypto';
import { BaseEntityService } from '@common/services';
import type { FetchAllResponse } from '@common/types';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_ROLE } from './const';
import type {
  CreateUserDto,
  UpdatePasswordDto,
  UserSearchParamsDto,
} from './dto';
import { User } from './entities';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  #state: User[] = [];

  fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: UserSearchParamsDto): FetchAllResponse<User[]> {
    const list = [...this.#state];
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToFetchAllResponse(list, page, limit);
  }

  fetchOne(id: string): User {
    const user = this.#state.find((user) => user.id === id);
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }

  insertOne({ login, password, role = USER_ROLE.VIEWER }: CreateUserDto): User {
    const date = Date.now();
    const user: User = new User({
      id: randomUUID(),
      login,
      password,
      role,
      createdAt: date,
      updatedAt: date,
    });
    this.#state.push(user);
    return user;
  }

  updateOne(id: string, { oldPassword, newPassword }: UpdatePasswordDto): User {
    const user = this.fetchOne(id);
    if (user.password !== oldPassword)
      throw new ForbiddenException(`Old password is wrong`);
    user.password = newPassword;
    return user;
  }

  deleteOne(id: string): void {
    const user = this.fetchOne(id);
    this.#state = this.#state.filter(({ id }) => user.id !== id);
  }
}
