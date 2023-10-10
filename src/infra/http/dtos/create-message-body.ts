import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageBody {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    body: string;
    @ApiProperty({ required: false })
    @IsOptional()
    mediaBase64?: string;
    @ApiProperty({ required: false })
    @IsOptional()
    mediaType?: string;
    @ApiProperty({ required: false })
    @IsOptional()
    mediaName?: string;
    @ApiProperty({ required: false })
    @IsOptional()
    isGroup?: boolean;
    @ApiProperty({ required: false })
    @IsOptional()
    mentionedIds: string[];
    @ApiProperty({ required: false })
    @IsOptional()
    whatsappId: number;
}
