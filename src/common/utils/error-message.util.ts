export const idInvalidMessage = (entity: string = 'Entity') =>
  `${entity} id is invalid (not uuid)`;

export const idNotFoundMessage = (entity: string = 'Entity') =>
  `${entity} doesn't exist`;

export const bodyInvalidFieldMessage = (field: string) =>
  `Request body contains invalid field: ${field}`;

export const bodyRequiredFieldMessage = (field: string) =>
  `Request body is missing required field: ${field}`;

export const queryInvalidParamMessage = (param: string) =>
  `Request query contains invalid param: ${param}`;

export const queryRequiredParamMessage = (param: string) =>
  `Request query is missing required param: ${param}`;
