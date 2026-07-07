import { SORT_ORDER, type SortOrder } from '@common/const';
import type { FetchAllResponse } from '@common/types';

export abstract class BaseEntityService<T extends object> {
  protected sortBySearchParams(
    data: T[],
    sortBy?: keyof T,
    order?: SortOrder,
  ): void {
    if (sortBy && order) {
      data.sort((a, b) => {
        if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number')
          return order === SORT_ORDER.ASC
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy];

        if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string')
          return order === SORT_ORDER.ASC
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);

        return 0;
      });
    }
  }

  protected mapToFetchAllResponse(
    list: T[],
    page: number = 1,
    limit: number = list.length,
  ): FetchAllResponse<T[]> {
    return {
      data: list.slice((page - 1) * limit, page * limit),
      page,
      limit: limit,
      total: list.length,
    };
  }
}
