import { User } from '@common/entities';
import type { PrismaUser } from '@common/types';
import { Role } from '@generated/enums';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import bcrypt from 'bcrypt';
import type { AuthDto } from './dto';

@Injectable()
export class AuthService {
  private OMIT = { password: true };
  constructor(private prismaService: PrismaService) {}

  async signup({ login, password }: AuthDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (user) {
      throw new BadRequestException('Login is already taken');
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prismaService.user.create({
      data: { login, password: bcryptPassword, role: Role.VIEWER },
      omit: this.OMIT,
    });

    return this.mapToUser(newUser);
  }

  private mapToUser(user: PrismaUser): User {
    return new User({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
  }
}
