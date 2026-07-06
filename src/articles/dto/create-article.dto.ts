import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ARTICLE_STATUS, type ArticleStatus } from '../const';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(ARTICLE_STATUS)
  @IsOptional()
  status: ArticleStatus;

  @IsString()
  @IsOptional()
  authorId: string | null;

  @IsString()
  @IsOptional()
  categoryId: string | null;

  @IsArray({ each: true })
  @IsString()
  @IsOptional()
  tags: string[];
}
