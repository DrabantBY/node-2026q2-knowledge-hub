import type { PaginationResponse } from '@common/types';
import { idNotFoundMessage } from '@common/utils';
import { Prisma } from '@generated/client';
import { Role } from '@generated/enums';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import type {
  CreateUserDto,
  UpdatePasswordDto,
  UserSearchParamsDto,
} from './dto';
import { User } from './entities';

type PrismaUser = Prisma.UserGetPayload<{ omit: { password: true } }>;

@Injectable()
export class UsersService {
  private OMIT = { password: true };
  constructor(private prismaService: PrismaService) {}

  async fetchAll({
    sortBy,
    order,
    page,
    limit,
  }: UserSearchParamsDto): Promise<PaginationResponse<User>> {
    const orderBy: Prisma.UserOrderByWithRelationInput | undefined = sortBy
      ? { [sortBy]: order }
      : undefined;

    const [prismaUsers, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        omit: this.OMIT,
      }),
      this.prismaService.user.count(),
    ]);

    return {
      data: prismaUsers.map(this.mapToUser),
      page,
      limit,
      total,
    };
  }

  async fetchOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: this.OMIT,
    });

    if (!user) throw new NotFoundException(idNotFoundMessage('User'));

    return this.mapToUser(user);
  }

  async insertOne({
    login,
    password,
    role = Role.VIEWER,
  }: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        login,
        password,
        role,
      },
      omit: this.OMIT,
    });

    return this.mapToUser(user);
  }

  async updateOne(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(idNotFoundMessage('User'));

    if (user.password !== oldPassword)
      throw new ForbiddenException(`Old password is wrong`);

    const newUser = await this.prismaService.user.update({
      where: { id },
      data: { password: newPassword },
      omit: this.OMIT,
    });

    return this.mapToUser(newUser);
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      )
        throw new NotFoundException(idNotFoundMessage('User'));
      else throw err;
    }
  }

  private mapToUser(user: PrismaUser): User {
    return new User({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
  }
}
