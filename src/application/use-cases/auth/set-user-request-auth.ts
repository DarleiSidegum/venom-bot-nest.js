import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { IUserRepository } from 'src/domain/repositories/user-repository';

@Injectable()
export class SetUserRequestAuth {
    constructor(private userRepository: IUserRepository) {}

    async execute(req: Request, userId: number) {
        try {
            const user = await this.userRepository.findOne({ user_id: userId });
            if (user) {
                req['user'] = user; // DEFINE USUARIO DA REQUEST
            }
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
