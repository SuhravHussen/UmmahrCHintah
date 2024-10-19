import { Reflector } from '@nestjs/core';
import { Role } from '../interfaces/roles.interface';

export const Roles = Reflector.createDecorator<Role[]>();
