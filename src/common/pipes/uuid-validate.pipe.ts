import { idInvalidMessage } from '@common/utils';
import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export const uuidValidatePipe = (entity = 'Entity') =>
  new ParseUUIDPipe({
    exceptionFactory: () => new BadRequestException(idInvalidMessage(entity)),
  });
