import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/domain/models/user';

export class UserViewModel {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    constructor(user: UserModel) {
        this.user_id = user.user_id;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
    }
}
