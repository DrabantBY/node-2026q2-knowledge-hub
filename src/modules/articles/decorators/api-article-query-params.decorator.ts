import { ARTICLE_SORT_KEY, ARTICLE_STATUS } from '@articles/const';
import { ApiQueryParams } from '@common/decorators';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiArticleQueryParams = () =>
  applyDecorators(
    ApiQuery({
      name: 'status',
      required: false,
      enum: ARTICLE_STATUS,
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
