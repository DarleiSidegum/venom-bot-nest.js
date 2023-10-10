import { Controller, Get } from '@nestjs/common';
import { Body, Param, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAuth } from 'src/application/use-cases/auth/login-auth';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { UserRequest } from 'src/helpers/decorators/user-request.decorator';
import { UserModel } from 'src/domain/models/user';
import { ResetJWTAuth } from 'src/application/use-cases/auth/reset-jwt-auth';
import { CreateJWTAuth } from 'src/application/use-cases/auth/create-jwt-auth';
import { LoginAuthBody } from '../dtos/login-auth-body';
import { AuthViewModel } from '../view-models/auth-view-model';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AuthViewModel)
export class AuthsController {
    constructor(private loginAuth: LoginAuth, private resetToken: ResetJWTAuth, private createJWTAuth: CreateJWTAuth) {}

    @Post('login')
    async login(@Body() body: LoginAuthBody) {
        const { token, refreshToken, user } = await this.loginAuth.execute(body);
        return new AuthViewModel({ token, refreshToken, user });
    }

    @UseGuards(AuthGuard)
    @Post('refreshToken')
    async refreshToken(@UserRequest() user: UserModel) {
        const refreshToken = await this.resetToken.execute(user);
        const token = await this.createJWTAuth.execute(user);
        return { refreshToken, token };
    }
}
