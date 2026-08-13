import { randomUUID } from 'node:crypto';
import { ArticlesService } from '@articles/articles.service';
import { BaseEntityService } from '@common/services';
import type { PaginationResponse } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';
import { USER_ROLE } from './const';
import type { CreateUserDto, UpdatePasswordDto, UserSearchParamsDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService extends BaseEntityService<User> {
  constructor(
    private articleService: ArticlesService,
    private configService: ConfigService,
  ) {
    super();
  }

  #state: User[] = [];

  async fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: UserSearchParamsDto): Promise<PaginationResponse<User>> {
    const list = [...this.#state];
    this.sortBySearchParams(list, sortBy, order);
    return this.mapToPagination(list, page, limit);
  }

  async fetchOne(id: string): Promise<User> {
    const user = this.#state.find((user) => user.id === id);
    if (!user) throw new NotFoundException(idNotFoundMessage('User'));
    return user;
  }

  async insertOne({ login, password, role = USER_ROLE.VIEWER }: CreateUserDto): Promise<User> {
    const date = Date.now();

    const CRYPT_SALT = Number(this.configService.get<string>('CRYPT_SALT')) || 10;
    const bcryptPassword = await bcrypt.hash(password, CRYPT_SALT);

    const user: User = new User({
      id: randomUUID(),
      login,
      password: bcryptPassword,
      role,
      createdAt: date,
      updatedAt: date,
    });
    this.#state.push(user);
    return user;
  }

  async updateOne(id: string, { oldPassword, newPassword }: UpdatePasswordDto): Promise<User> {
    const user = await this.fetchOne(id);

    const isPasswordsEqual = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordsEqual) throw new ForbiddenException(`Old password is wrong`);

    const CRYPT_SALT = Number(this.configService.get<string>('CRYPT_SALT')) || 10;
    const bcryptPassword = await bcrypt.hash(newPassword, CRYPT_SALT);

    user.password = bcryptPassword;
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
