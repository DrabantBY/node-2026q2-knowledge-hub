import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
    example: 'TestPassword',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: 'string',
    example: 'NextPassword',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
