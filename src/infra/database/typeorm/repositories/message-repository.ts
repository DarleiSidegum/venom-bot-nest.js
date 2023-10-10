import { Injectable, OnModuleInit } from '@nestjs/common';
import { IMessageRepository } from 'src/domain/repositories/message-repository';
import { MessageModel } from 'src/domain/models/message';

@Injectable()
export class MessageRepository implements IMessageRepository {
    constructor() {}

    start(client){
        client.onMessage((message) => {
            if (message.body === 'Hi' && message.isGroupMsg === false) {
                client
                .sendText(message.from, 'Welcome Venom 🕷')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                client
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
            }
        });
    }

    send(message: MessageModel): Promise<MessageModel> {
        throw new Error('Method not implemented.');
    }

}
