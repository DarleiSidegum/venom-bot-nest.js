import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { UserModel } from 'src/domain/models/user';
import { IUserRepository } from 'src/domain/repositories/user-repository';

interface LoginAuthRequest {
    email: string;
    password: string;
}

interface LoginAuthResponse {
    user: UserModel;
}

@Injectable()
export class CheckUserAuth {
    constructor(private readonly logger: ILogger, private userRepository: IUserRepository, private readonly bcryptService: IBcryptService) {}

    async execute(request: LoginAuthRequest): Promise<LoginAuthResponse> {
        const { email, password } = request;
        const user = await this.userRepository.findOne({ email });

        if (!user) {
            this.logger.error('CheckUserAuth execute', 'User not found');
            return;
        }
        if (!(await this.bcryptService.compare(password, user.password))) {
            this.logger.error('CheckUserAuth execute', 'Invalid Credentials');
            return;
        }

        return { user };
    }
}
