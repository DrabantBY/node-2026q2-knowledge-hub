import {
  queryInvalidParamMessage,
  queryRequiredParamMessage,
} from '@common/utils';
import { ValidationPipe } from '@nestjs/common';

import { factoryValidatePipe } from './factory-validate.pipe';

export const reqQueryValidatePipe = () =>
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: factoryValidatePipe(
      queryRequiredParamMessage,
      queryInvalidParamMessage,
    ),
  });
