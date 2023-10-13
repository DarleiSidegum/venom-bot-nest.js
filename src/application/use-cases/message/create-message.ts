import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { MessageModel } from 'src/domain/models/message';
import { IMessageRepository } from 'src/domain/repositories/message-repository';
// import * as venom from 'venom-bot';
import { create, Whatsapp } from '@wppconnect-team/wppconnect';
interface CreateMessageRequest {
    body: string;
    mediaBase64?: string;
    mediaType?: string;
    mediaName?: string;
    isGroup?: boolean;
    mentionedIds: string[];
    phone: string;
}

interface CreateMessageResponse {
    message: any;
}

@Injectable()
export class CreateMessage implements OnModuleInit {
    constructor(private readonly logger: ILogger, private readonly messageRepository: IMessageRepository) {}
    client: Whatsapp;
    async execute(request: CreateMessageRequest): Promise<CreateMessageResponse> {
        let {body, phone, mediaBase64, mediaName, mediaType, isGroup, mentionedIds} = request;
        // const message = new MessageModel();
        // Object.assign(message, request);

        let sended_message;
        await this.client.sendText(phone+'@c.us', body)
        .then((result) => {
            sended_message = result;
        })

        this.logger.log('Send Message execute', 'New message have been sended');

        return { message: sended_message };
    }

    async createSession(){
        create({
            session: 'session-name' //name of session
          })
        .then((_client: Whatsapp) => {
            this.start(_client);
            this.client = _client;
        })
        .catch((erro) => {
            console.log(erro);
        });
    }

    start(client: Whatsapp){
        client.onMessage((message) => {
            if (message.body === 'Hi' && message.isGroupMsg === false) {
                client
                .sendText(message.from, 'Welcome WP Connect')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })

                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
            }
        });
    }

    async onModuleInit() {
        await this.createSession();
    }
}
