import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_ROLE, type UserRole } from '../const';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(USER_ROLE)
  @IsOptional()
  role?: UserRole;
}
