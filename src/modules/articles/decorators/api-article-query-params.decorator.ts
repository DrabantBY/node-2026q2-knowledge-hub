import { ARTICLE_SORT_KEY } from '@articles/const';
import { Status } from '@generated/enums';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ApiQueryParams } from '@swagger/decorators';

export const ApiArticleQueryParams = () =>
  applyDecorators(
    ApiQuery({
      name: 'status',
      required: false,
      enum: Status,
      description: 'Filter by status',
    }),
    ApiQuery({
      name: 'categoryId',
      required: false,
      type: String,
      format: 'uuid',
      description: 'Filter by category id',
    }),
    ApiQuery({
      name: 'tag',
      required: false,
      type: String,
      description: 'Filter by tag',
    }),
    ApiQueryParams(ARTICLE_SORT_KEY),
  );
