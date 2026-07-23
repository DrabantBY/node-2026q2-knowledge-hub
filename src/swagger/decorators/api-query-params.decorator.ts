import { Prisma } from '@generated/client';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiQueryParams = (sortKeys: Record<string, string>) =>
  applyDecorators(
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: sortKeys,
      description: 'Sort by keys',
    }),

    ApiQuery({
      name: 'order',
      required: false,
      enum: Prisma.SortOrder,
      description: 'Sort by order',
    }),

    ApiQuery({
      name: 'page',
      required: false,
      type: 'integer',
      description: 'Current page',
      example: 1,
    }),

    ApiQuery({
      name: 'limit',
      required: false,
      type: 'integer',
      description: 'Entities per page',
      example: 10,
    }),
  );
