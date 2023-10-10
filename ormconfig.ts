import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV == 'production' ? '.env.production' : '.env',
});
const booleanString = (word: any) => {
    switch (String(word).toLowerCase().trim()) {
        case 'yes':
        case 'true':
        case '1':
            return true;
        case 'no':
        case 'false':
        case '0':
        case null:
            return false;
        default:
            return Boolean(word);
    }
};
export const config: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'INFO345',
    database: process.env.DB_DATABASE || 'novo_chat',
    entities: [__dirname + 'src/infra/database/typeorm/entities/*{.ts,.js}'],
    synchronize: booleanString(process.env.BD_SINCROZAR),
    logging: booleanString(process.env.BD_LOGGING),
    timezone: 'Z',
    charset: 'utf8mb4',
};
