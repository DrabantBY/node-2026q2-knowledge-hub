import { randomUUID } from 'node:crypto';
import { ArticlesService } from '@articles/articles.service';
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
  constructor(private articleService: ArticlesService) {
    super();
  }

  #state: User[] = [];

  async fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: UserSearchParamsDto): Promise<FetchAllResponse<User[]>> {
    const list = [...this.#state];
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToFetchAllResponse(list, page, limit);
  }

  async fetchOne(id: string): Promise<User> {
    const user = this.#state.find((user) => user.id === id);
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }

  async insertOne({
    login,
    password,
    role = USER_ROLE.VIEWER,
  }: CreateUserDto): Promise<User> {
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

  async updateOne(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.fetchOne(id);
    if (user.password !== oldPassword)
      throw new ForbiddenException(`Old password is wrong`);
    user.password = newPassword;
    user.updatedAt = Date.now();
    return user;
  }

  async deleteOne(id: string): Promise<void> {
    const user = await this.fetchOne(id);
    this.#state = this.#state.filter(({ id }) => user.id !== id);
    await this.articleService.resetAuthorId(id);
    await this.articleService.deleteComment(id);
  }
}
