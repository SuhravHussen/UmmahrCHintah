"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa");
let AuthGuard = class AuthGuard {
    constructor() {
        this.jwksClient = jwksRsa({
            jwksUri: `${process.env.AUTH0_API}/.well-known/jwks.json`,
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
        });
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.HttpException({
                devMessage: 'Unauthorized! No token found, error in AuthGuard',
                clientMessage: 'Sorry! You are not allowed to perform this action.',
            }, 401);
        }
        try {
            const decodedToken = await this.verifyToken(token);
            if (!decodedToken)
                throw new Error('unauthorized');
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                devMessage: error.message,
                clientMessage: 'Sorry! You are not allowed to perform this action.',
            }, 401);
        }
    }
    extractTokenFromHeader(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader)
            return null;
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token)
            return null;
        return token;
    }
    async verifyToken(token) {
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken)
            throw new common_1.UnauthorizedException('Invalid token format');
        const key = await this.jwksClient.getSigningKey(decodedToken.header.kid);
        const publicKey = key.getPublicKey();
        const verified = jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
            audience: decodedToken.payload.aud,
            issuer: decodedToken.payload.iss,
        });
        return verified;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map