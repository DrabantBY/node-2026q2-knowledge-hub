import { baseSearchParamsDtoFactory } from '@common/dto';
import { IsDefined, IsUUID } from 'class-validator';
import { COMMENT_SORT_KEY } from '../const';

export class CommentSearchParamsDto extends baseSearchParamsDtoFactory(
  COMMENT_SORT_KEY,
) {
  @IsUUID()
  @IsDefined()
  articleId: string;
}
