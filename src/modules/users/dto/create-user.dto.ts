import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_ROLE, type UserRole } from '../const';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'TestUser',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'TestPassword',
  })
  @IsString()
  @IsNotEmpty()
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
