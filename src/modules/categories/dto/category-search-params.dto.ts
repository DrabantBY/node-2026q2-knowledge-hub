import { baseSearchParamsDtoFactory } from '@common/dto';
import { CATEGORY_SORT_KEY } from '../const';

export class CategorySearchParamsDto extends baseSearchParamsDtoFactory(
  CATEGORY_SORT_KEY,
) {}
