import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';
import { promisify } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwksClient: jwksRsa.JwksClient;

  constructor() {
    // Configure the JWKS Client to point to Auth0 JWKS URI
    this.jwksClient = jwksRsa({
      jwksUri:
        'https://dev-4mkdqwt1k7tgzw1q.us.auth0.com/.well-known/jwks.json', // Update with your Auth0 domain
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // Step 1: Extract token
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException(
        {
          devMessage: 'Unauthorized! No token found, error in AuthGuard',
          clientMessage: 'Sorry! You are not allowed to perform this action.',
        },
        401,
      );
    }

    // Step 2: Verify the token
    try {
      const decodedToken = await this.verifyToken(token);
      // Attach the decoded token (user info) to the request object for further use
      request['user'] = decodedToken;
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! You are not allowed to perform this action.',
        },
        401,
      );
    }
  }

  // Step 1: Extract JWT from the Authorization header
  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) return null;
    return token;
  }

  // Step 2: Verify the JWT using the public key from JWKS
  private async verifyToken(token: string): Promise<any> {
    // Decode token to get the "kid" (key ID)
    const decodedToken: any = jwt.decode(token, { complete: true });
    console.log(decodedToken);
    if (!decodedToken) throw new UnauthorizedException('Invalid token format');

    // Fetch the signing key from Auth0 using "kid"
    const getKey = promisify(this.jwksClient.getSigningKey);
    const key = await getKey(decodedToken.header.kid);
    const publicKey = key.getPublicKey();

    // Verify the token with the public key
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      audience: decodedToken.payload.aud, // Your API audience
      issuer: decodedToken.payload.iss, // Your Auth0 domain
    });
  }
}
