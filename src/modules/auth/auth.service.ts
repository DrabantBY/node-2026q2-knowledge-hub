import { Role } from '@generated/enums';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma';
import bcrypt from 'bcrypt';
import type { AuthDto } from './dto';
import type { TokenAuth } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup({ login, password }: AuthDto): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (user) throw new BadRequestException('Login is already taken');

    const CRYPT_SALT = this.configService.get<number>('CRYPT_SALT');
    const bcryptPassword = await bcrypt.hash(password, CRYPT_SALT);

    await this.prismaService.user.create({
      data: { login, password: bcryptPassword, role: Role.VIEWER },
    });
  }

  async signin({ login, password }: AuthDto): Promise<TokenAuth> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (!user) throw new ForbiddenException('Login or password is incorrect');

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual)
      throw new ForbiddenException('Login or password is incorrect');

    return this.createJwtToken(user.id, user.login, user.role);
  }

  private async createJwtToken(
    userId: string,
    login: string,
    role: Role,
  ): Promise<TokenAuth> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login, role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_TTL'),
        },
      ),
      this.jwtService.signAsync(
        { userId, login, role },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_TTL'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
