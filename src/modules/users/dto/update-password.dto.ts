import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    format: 'password',
    example: 'TestPassword',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: String,
    format: 'password',
    example: 'NextPassword',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
