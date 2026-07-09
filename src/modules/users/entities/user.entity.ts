import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { USER_ROLE, type UserRole } from '../const';

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
    enum: Object.values(USER_ROLE),
    example: USER_ROLE.VIEWER,
    default: USER_ROLE.VIEWER,
  })
  role: UserRole;

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
