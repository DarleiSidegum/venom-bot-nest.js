import { ApiProperty } from '@nestjs/swagger';
import { UserViewModel } from './user-view-model';

export class AuthViewModel {
    @ApiProperty()
    token: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    user: UserViewModel;

    constructor(auth: any) {
        this.token = auth.token;
        this.refreshToken = auth.refreshToken;
        this.user = new UserViewModel(auth.user);
    }
}
