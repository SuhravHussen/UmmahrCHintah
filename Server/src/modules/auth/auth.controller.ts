import {
  Controller,
  Res,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthGuard } from '../../common/guards/auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/role.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  // @Post('generateToken')
  // async generateToken(
  //   @Body() body: { role: string; email: string },
  //   @Res({ passthrough: true }) response: FastifyReply,
  // ) {
  //   const { role, email } = body;
  //   console.log(role, email);
  //   // Generate JWT token
  //   const token = this.jwtService.sign({ role, email });
  //   // Send JWT as cookie
  //   response.header(
  //     'Set-Cookie',
  //     `jwtToken=${token}; HttpOnly; Secure; SameSite=None; Max-Age=3600;`,
  //   );

  //   return response
  //     .status(200)
  //     .send({ message: 'Token generated and sent as cookie' });
  // }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Get('getRoleFromToken')
  async getRoleFromToken(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return response.status(200).send({});
  }

  @Post('send-verification-email')
  async sendVerificationEmail(
    @Body()
    body: {
      userId: string;
      identity: { user_id: string; provider: string };
    },
  ) {
    return await this.authService.sendVerificationEmail(
      body.userId,
      body.identity,
    );
  }
}
