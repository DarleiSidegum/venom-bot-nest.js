import { MessageModel } from '../models/message';

export abstract class IMessageRepository {
    abstract send(message: MessageModel): Promise<MessageModel>;
    // abstract update(userId: number, user: Partial<UserModel>): Promise<UserModel>;
    // abstract delete(userId: number): Promise<void>;
    // abstract findOne(filter: Partial<UserModel>): Promise<UserModel | null>;
    // abstract findMany(filter: FilterUser): Promise<UserModel[] | null>;
    // abstract findAll(): Promise<UserModel[] | null>;
}
