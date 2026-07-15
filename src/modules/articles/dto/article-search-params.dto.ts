import { baseSearchParamsDtoFactory } from '@common/dto';
import { Status } from '@generated/enums';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ARTICLE_SORT_KEY } from '../const';

export class ArticleSearchParamsDto extends baseSearchParamsDtoFactory(
  ARTICLE_SORT_KEY,
) {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
