import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    private readonly jwksClient;
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
    private verifyToken;
}
