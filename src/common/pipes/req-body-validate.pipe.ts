import {
  bodyInvalidFieldMessage,
  bodyRequiredFieldMessage,
} from '@common/utils';
import { ValidationPipe } from '@nestjs/common';

import { factoryValidatePipe } from './factory-validate.pipe';

export const reqBodyValidatePipe = () =>
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: factoryValidatePipe(
      bodyRequiredFieldMessage,
      bodyInvalidFieldMessage,
    ),
  });
