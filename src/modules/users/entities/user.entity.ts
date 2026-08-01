import { Role } from '@generated/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'TestUser',
  })
  login: string;

  @ApiProperty({
    enum: Object.values(Role),
    example: Role.VIEWER,
    default: Role.VIEWER,
  })
  role: Role;

  @ApiProperty({
    type: 'integer',
    example: 1655000000,
  })
  createdAt: number;

  @ApiProperty({
    type: 'integer',
    example: 1655000000,
  })
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
