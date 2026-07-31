import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class AuthDto {
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
}
