import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    format: 'password',
    example: 'TestPassword',
  })
  @IsString()
  @IsDefined()
  oldPassword: string;

  @ApiProperty({
    type: String,
    format: 'password',
    example: 'NextPassword',
  })
  @IsString()
  @IsDefined()
  newPassword: string;
}
