import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    example: 'editor',
  })
  @IsString()
  @IsDefined()
  login: string;

  @ApiProperty({
    type: String,
    format: 'password',
    example: 'editor',
  })
  @IsString()
  @IsDefined()
  password: string;
}
