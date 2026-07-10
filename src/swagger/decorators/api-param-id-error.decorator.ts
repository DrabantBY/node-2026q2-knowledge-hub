import { idInvalidMessage, idNotFoundMessage } from '@common/utils';
import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const ApiParamIdError = (entity: string = 'Entity') =>
  applyDecorators(
    ApiBadRequestResponse({ description: idInvalidMessage(entity) }),
    ApiNotFoundResponse({
      description: idNotFoundMessage(entity),
    }),
  );
