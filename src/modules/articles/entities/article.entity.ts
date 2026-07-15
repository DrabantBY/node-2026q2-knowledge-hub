import { Status } from '@generated/enums';
import { ApiProperty } from '@nestjs/swagger';

export class Article {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, example: 'Introduction to NestJS' })
  title: string;

  @ApiProperty({
    type: String,
    example:
      'NestJS is a framework for building efficient server-side applications.',
  })
  content: string;

  @ApiProperty({
    enum: Object.values(Status),
    example: Status.DRAFT,
    default: Status.DRAFT,
  })
  status: Status;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    default: null,
    example: '00000000-0000-0000-0000-000000000000',
  })
  authorId: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true,
    default: null,
    example: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  })
  categoryId: string | null;

  @ApiProperty({
    type: [String],
    example: ['nodejs', 'typescript'],
  })
  tags: string[];

  @ApiProperty({ type: 'integer', example: 1655000000 })
  createdAt: number;

  @ApiProperty({ type: 'integer', example: 1655000000 })
  updatedAt: number;

  constructor(data: Partial<Article>) {
    Object.assign(this, data);
  }
}
