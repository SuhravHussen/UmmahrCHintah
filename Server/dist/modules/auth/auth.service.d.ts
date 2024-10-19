import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getRoleFromToken(token: string): string | null;
}
