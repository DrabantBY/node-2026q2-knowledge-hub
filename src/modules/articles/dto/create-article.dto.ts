import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ARTICLE_STATUS, type ArticleStatus } from '../const';

export class CreateArticleDto {
  @ApiProperty({
    type: 'string',
    example: 'Introduction to NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    example:
      'NestJS is a framework for building efficient server-side applications.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    enum: Object.values(ARTICLE_STATUS),
    example: ARTICLE_STATUS.DRAFT,
    default: ARTICLE_STATUS.DRAFT,
  })
  @IsEnum(ARTICLE_STATUS)
  @IsOptional()
  status?: ArticleStatus;

  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: '00000000-0000-0000-0000-000000000000',
    default: null,
  })
  @IsUUID()
  @IsOptional()
  authorId?: string | null;

  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    default: null,
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string | null;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string' },
    default: ['nodejs', 'typescript'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
