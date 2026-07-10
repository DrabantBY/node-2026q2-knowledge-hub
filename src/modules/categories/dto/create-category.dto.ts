import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Technology',
  })
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Articles about technology',
  })
  @IsString()
  @IsDefined()
  description: string;
}
