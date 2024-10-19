import { FastifyRequest } from 'fastify';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import getUserInfo from '../lib/getUserRole';
import matchRoles from '../lib/matchRoles';
import isEmptyObj from '../lib/isEmptyObj';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get(Roles, context.getHandler());

      if (!roles || isEmptyObj(roles)) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      const userInfo = await getUserInfo(token);

      if (userInfo['/roles'] && userInfo['/roles'].length > 0) {
        return matchRoles(roles, userInfo['/roles']);
      } else {
        return false;
      }
    } catch (error) {
      // console.error('Error in RolesGuard:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! You are not allowed to perform this action.',
        },
        401,
      );
      return false;
    }
  }

  private extractTokenFromHeader(request: FastifyRequest): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) return null;
    return token;
  }
}
