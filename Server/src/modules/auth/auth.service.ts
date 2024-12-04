import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import getManagementToken from '../../lib/getAuth0ManagmentToken';

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

  async sendVerificationEmail(
    user_id: string,
    identity: { user_id: string; provider: string },
  ) {
    try {
      const token = await getManagementToken();

      console.log(user_id, process.env.AUTH0_CLIENT_ID);
      const response = await fetch(
        `${process.env.AUTH0_API}/api/v2/jobs/verification-email`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user_id,
            client_id: process.env.AUTH0_CLIENT_ID,
            identity: {
              user_id: identity.user_id,
              provider: identity.provider,
            },
          }),
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error assigning roles:', error);
      throw new HttpException(
        {
          devMessage: error.message,
          clientMessage: 'Sorry! Something wrong in our server',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
