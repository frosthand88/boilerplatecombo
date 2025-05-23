import { DataSource } from 'typeorm';
import { ResearcherSchema2} from '../entity/Researcher2';
import dotenv from 'dotenv';

dotenv.config();

export const MysqlSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    entities: [ResearcherSchema2],
});
