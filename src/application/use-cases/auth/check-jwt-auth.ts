import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtService, IJwtServicePayload } from 'src/domain/adapters/jwt.interface';

@Injectable()
export class CheckJWTAuth {
    constructor(private readonly jwtService: IJwtService) {}

    async execute(headertoken: string): Promise<IJwtServicePayload> {
        try {
            const tokenParts = headertoken.split(' ');
            const [scheme, token] = tokenParts;
            let decode = await this.jwtService.checkToken(token, process.env.JWT_SECRET);
            return decode;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
