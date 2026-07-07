import { baseSearchParamsDtoFactory } from '@common/dto';
import { USER_SORT_KEY } from '../const';

export class UserSearchParamsDto extends baseSearchParamsDtoFactory(
  USER_SORT_KEY,
) {}
