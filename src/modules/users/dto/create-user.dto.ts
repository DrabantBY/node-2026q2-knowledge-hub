import { Role } from '@generated/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

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
    enum: Object.values(Role),
    example: Role.VIEWER,
    default: Role.VIEWER,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
