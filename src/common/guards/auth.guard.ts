import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Auth } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

declare module 'express' {
  interface Request {
    user?: {
      i: string;
      e: string;
      r: Role;
    };
  }
}

export const RoleWeight: Record<Role, number> = {
  [Role.USER]: 10,
  [Role.ADMIN]: 100,
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(Auth, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      const user = await this.jwtService.verifyAsync(token);

      request.user = user;
    } catch (e) {
      if (requiredRoles && requiredRoles.length) {
        throw new UnauthorizedException();
      }
    }

    const highestWeight = requiredRoles
      ? Math.max(...requiredRoles.map((role) => RoleWeight[role]))
      : 0;
    return requiredRoles && requiredRoles.length
      ? RoleWeight[request.user.r] >= highestWeight
      : true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
