import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: JwtService);
    getRoleFromToken(request: FastifyRequest, response: FastifyReply): Promise<never>;
}
