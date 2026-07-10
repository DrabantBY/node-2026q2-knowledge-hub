import { ErrorResponseDto } from '@common/dto';

import {
  bodyInvalidFieldMessage,
  bodyRequiredFieldMessage,
  idInvalidMessage,
  idNotFoundMessage,
  queryInvalidParamMessage,
  queryRequiredParamMessage,
} from '@common/utils';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  getSchemaPath,
} from '@nestjs/swagger';

interface ErrorResponseOptions {
  entity: string;
  withUuidError: boolean;
  withBodyError: boolean;
  withQueryError: boolean;
}

interface ErrorResponseExample {
  summary: string;
  value: {
    statusCode: HttpStatus;
    error: string;
    message: string;
  };
}

const createBadRequestErrorValue = (summary: string, message: string) => ({
  summary,
  value: {
    statusCode: HttpStatus.BAD_REQUEST,
    error: 'Bad Request',
    message,
  },
});

const createNotFoundErrorValue = (summary: string, message: string) => ({
  summary,
  value: {
    statusCode: HttpStatus.NOT_FOUND,
    error: 'Not Found',
    message,
  },
});

export const ApiErrorResponse = ({
  entity = 'Entity',
  withUuidError,
  withBodyError,
  withQueryError,
}: Partial<ErrorResponseOptions>) => {
  const examples = {} as Record<string, ErrorResponseExample>;

  if (withUuidError) {
    examples.invalidIdError = createBadRequestErrorValue(
      'invalid uuid',
      idInvalidMessage(entity),
    );
  }

  if (withBodyError) {
    examples.invalidFieldBodyError = createBadRequestErrorValue(
      'invalid body field',
      bodyInvalidFieldMessage('<field>'),
    );

    examples.requiredFieldBodyError = createBadRequestErrorValue(
      'missing body field',
      bodyRequiredFieldMessage('<field>'),
    );
  }

  if (withQueryError) {
    examples.invalidParamQueryError = createBadRequestErrorValue(
      'invalid query param',
      queryInvalidParamMessage('<param>'),
    );

    examples.requiredParamQueryError = createBadRequestErrorValue(
      'missing query param',
      queryRequiredParamMessage('<param>'),
    );
  }

  const decorators = [
    ApiExtraModels(ErrorResponseDto),
    ApiBadRequestResponse({
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(ErrorResponseDto) },
          examples,
        },
      },
    }),
  ];

  if (withUuidError) {
    decorators.push(
      ApiNotFoundResponse({
        description: 'Not Found',
        content: {
          'application/json': {
            schema: { $ref: getSchemaPath(ErrorResponseDto) },
            examples: {
              notFound: createNotFoundErrorValue(
                'entity not found by uuid',
                idNotFoundMessage(entity),
              ),
            },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
};
