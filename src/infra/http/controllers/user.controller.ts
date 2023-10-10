import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common/decorators';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserViewModel } from '../view-models/user-view-model';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { AuthGuard } from 'src/infra/guards/auth.guard';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserViewModel)
export class UsersController {
    constructor(private createUser: CreateUser) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body: CreateUserBody) {
        const { user } = await this.createUser.execute(body);
        return new UserViewModel(user);
    }
}
