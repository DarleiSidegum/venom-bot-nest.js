import { Injectable } from '@nestjs/common';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class CreateJWTAuth {
    constructor(private readonly jwtService: IJwtService) {}

    async execute(user: UserModel): Promise<string> {
        const { email, user_id, name } = user;

        const token = this.jwtService.createToken({ name, email, user_id }, process.env.JWT_SECRET, '4h');

        return token;
    }
}
