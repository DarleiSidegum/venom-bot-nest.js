import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    email: string;

    @Matches(/^\+?\d+$/)
    @IsOptional()
    phone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    password: string;
}
