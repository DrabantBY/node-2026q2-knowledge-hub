import type { Role } from '@generated/enums';
import { Reflector } from '@nestjs/core';

export const Permission = Reflector.createDecorator<Role[]>();
