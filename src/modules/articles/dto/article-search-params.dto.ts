import { baseSearchParamsDtoFactory } from '@common/dto';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ARTICLE_SORT_KEY, ARTICLE_STATUS, type ArticleStatus } from '../const';

export class ArticleSearchParamsDto extends baseSearchParamsDtoFactory(
  ARTICLE_SORT_KEY,
) {
  @IsEnum(ARTICLE_STATUS)
  @IsOptional()
  status?: ArticleStatus;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
