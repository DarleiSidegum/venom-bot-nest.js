export interface IFormatExceptionMessage {
    message: string[];
    error?: number;
}

export interface IException {
    badRequestException(data: IFormatExceptionMessage): void;
    internalServerErrorException(data?: IFormatExceptionMessage): void;
    forbiddenException(data?: IFormatExceptionMessage): void;
    UnauthorizedException(data?: IFormatExceptionMessage): void;
}
