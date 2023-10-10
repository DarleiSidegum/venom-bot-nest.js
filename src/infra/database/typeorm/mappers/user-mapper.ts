import { UserModel } from 'src/domain/models/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
    static toDatabase(user: UserModel): UserEntity {
        const userEntity: UserEntity = new UserEntity();

        userEntity.user_id = user.user_id;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.phone = user.phone;
        userEntity.password = user.password;
        userEntity.createdAt = user.createdAt;
        return userEntity;
    }

    static toDomain(userEntity: UserEntity): UserModel {
        const user: UserModel = new UserModel();

        user.user_id = userEntity.user_id;
        user.name = userEntity.name;
        user.email = userEntity.email;
        user.phone = userEntity.phone;
        user.password = userEntity.password;
        user.createdAt = userEntity.createdAt;
        user.updatedAt = userEntity.updatedAt;

        return user;
    }
}
