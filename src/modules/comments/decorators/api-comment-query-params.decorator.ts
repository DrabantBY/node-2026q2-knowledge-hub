import { COMMENT_SORT_KEY } from '@comments/const';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ApiQueryParams } from '@swagger/decorators';

export const ApiCommentQueryParams = () =>
  applyDecorators(
    ApiQuery({
      name: 'articleId',
      required: true,
      type: String,
      format: 'uuid',
      description: 'Filter by article id',
    }),
    ApiQueryParams(COMMENT_SORT_KEY),
  );
