import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getRoleFromToken(token: string): string | null {
    try {
      const payload = this.jwtService.verify(token); // Verify the token
      return payload.role; // Assuming your token contains a role property
    } catch (error) {
      console.error('Token verification failed:', error);
      return null; // Token is invalid
    }
  }
}
