import { BadRequestException, type ValidationError } from '@nestjs/common';

type ErrorMessageCallback = (data: string) => string;

const parseValidationError = (
  error: ValidationError,
  requiredErrCallback: ErrorMessageCallback,
  invalidErrCallback: ErrorMessageCallback,
): string => {
  if (error.children?.length)
    return parseValidationError(
      error.children[0],
      requiredErrCallback,
      invalidErrCallback,
    );

  const isDefined = Object.keys(error.constraints ?? {}).includes('isDefined');

  return isDefined
    ? requiredErrCallback(error.property)
    : invalidErrCallback(error.property);
};

export const factoryValidatePipe =
  (
    requiredErrCallback: ErrorMessageCallback,
    invalidErrCallback: ErrorMessageCallback,
  ) =>
  (errors: ValidationError[]) =>
    new BadRequestException(
      parseValidationError(errors[0], requiredErrCallback, invalidErrCallback),
    );
