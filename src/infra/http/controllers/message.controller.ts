import { Controller } from '@nestjs/common';
import { Body, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessage } from 'src/application/use-cases/message/create-message';
import { CreateMessageBody } from '../dtos/create-message-body';
import { AuthGuard } from 'src/infra/guards/auth.guard';

@Controller('message')
@ApiTags('message')
@ApiResponse({ status: 500, description: 'Internal error' })
export class MessagesController {
    constructor(private createMessage: CreateMessage) {}

    // @UseGuards(AuthGuard)
    // @Post()
    // async create(@Body() body: CreateMessageBody) {
    //     const { message } = await this.createMessage.execute(body);
    //     return message;
    // }

    @Post('ocult/:phone')
    async ocult(
        @Body() _body: CreateMessageBody,
        @Param('phone') phone: string
    ) {
        const {message} = await this.createMessage.execute({phone, ..._body});
        return message;
    }
}
