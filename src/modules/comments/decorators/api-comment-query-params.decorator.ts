import { COMMENT_SORT_KEY } from '@comments/const';
import { ApiQueryParams } from '@common/decorators';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

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
