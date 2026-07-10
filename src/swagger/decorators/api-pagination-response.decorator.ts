import { applyDecorators, type Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

class PaginationResponseDto {
  @ApiProperty({
    type: 'integer',
    example: 1,
  })
  total: number;

  @ApiProperty({
    type: 'integer',
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: 'integer',
    example: 1,
  })
  limit: number;
}

export const ApiPaginationResponse = <T extends Type<unknown>>(model: T) =>
  applyDecorators(
    ApiExtraModels(PaginationResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          { $ref: getSchemaPath(PaginationResponseDto) },
        ],
      },
    }),
  );
