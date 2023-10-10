import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository';
import { UserRepository } from './typeorm/repositories/user-repository';
import { IMessageRepository } from 'src/domain/repositories/message-repository';
import { MessageRepository } from './typeorm/repositories/message-repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IMessageRepository,
            useClass: MessageRepository,
        },
    ],
    exports: [IUserRepository, IMessageRepository],
})
export class DatabaseModule {}
