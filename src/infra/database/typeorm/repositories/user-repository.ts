import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FilterUser, IUserRepository } from 'src/domain/repositories/user-repository';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
    ) {}
    async create(user: UserModel): Promise<UserModel> {
        try {
            return await this.userEntityRepository
                .save(user)
                .then(async (userSaved) => {
                    const userUpdated = await this.findOne({ user_id: userSaved.user_id });
                    return userUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Erro ao Create User! - 002',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Erro ao Create User! - 001',
                ...error,
            });
        }
    }
    update(userId: number, user: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    delete(userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async findOne(filter: Partial<UserModel>): Promise<UserModel> {
        return await this.userEntityRepository.findOneBy(filter);
    }
    findMany(filter: FilterUser): Promise<UserModel[]> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<UserModel[]> {
        throw new Error('Method not implemented.');
    }
}
