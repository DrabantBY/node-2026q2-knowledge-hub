import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Technology',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Articles about technology',
  })
  description: string;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
