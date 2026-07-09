import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'Articles about technology',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
