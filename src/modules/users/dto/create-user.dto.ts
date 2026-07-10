import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { USER_ROLE, type UserRole } from '../const';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  @IsString()
  @IsDefined()
  login: string;

  @ApiProperty({
    type: String,
    format: 'password',
    example: 'TestPassword',
  })
  @IsString()
  @IsDefined()
  password: string;

  @ApiPropertyOptional({
    enum: Object.values(USER_ROLE),
    example: USER_ROLE.VIEWER,
    default: USER_ROLE.VIEWER,
  })
  @IsEnum(USER_ROLE)
  @IsOptional()
  role?: UserRole;
}
