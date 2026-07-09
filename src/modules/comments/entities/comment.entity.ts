import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Great article!',
  })
  content: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  })
  articleId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    example: '00000000-0000-0000-0000-000000000000',
    default: null,
  })
  authorId: string | null;

  @ApiProperty({
    type: 'integer',
    example: 1655000000,
  })
  createdAt: number;

  constructor(data: Partial<Comment>) {
    Object.assign(this, data);
  }
}
