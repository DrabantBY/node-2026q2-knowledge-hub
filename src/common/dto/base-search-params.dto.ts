import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SORT_ORDER, type SortOrder } from '../const';

export const baseSearchParamsDtoFactory = <T extends Record<string, string>>(
  obj: T,
) => {
  abstract class BaseSearchParamsDto {
    @IsEnum(obj)
    @IsOptional()
    sortBy?: T[keyof T];

    @IsEnum(SORT_ORDER)
    @IsOptional()
    order?: SortOrder;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    limit?: number;
  }

  return BaseSearchParamsDto;
};
