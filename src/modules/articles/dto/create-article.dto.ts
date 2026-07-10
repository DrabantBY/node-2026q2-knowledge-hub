import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ARTICLE_STATUS, type ArticleStatus } from '../const';

export class CreateArticleDto {
  @ApiProperty({
    type: String,
    example: 'Introduction to NestJS',
  })
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty({
    type: String,
    example:
      'NestJS is a framework for building efficient server-side applications.',
  })
  @IsString()
  @IsDefined()
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
    type: String,
    format: 'uuid',
    nullable: true,
    example: '00000000-0000-0000-0000-000000000000',
    default: null,
  })
  @IsUUID()
  @IsOptional()
  authorId?: string | null;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    nullable: true,
    example: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    default: null,
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string | null;

  @ApiPropertyOptional({
    type: [String],
    example: ['nodejs', 'typescript'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
