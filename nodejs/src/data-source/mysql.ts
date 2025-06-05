import { DataSource } from 'typeorm';
import { ResearcherSchema2 } from '../entity/Researcher2';
import dotenv from 'dotenv';

dotenv.config();

let dataSource: DataSource | null = null;

export async function getMysqlSource(): Promise<DataSource> {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            synchronize: false,
            entities: [ResearcherSchema2],
        });

        await dataSource.initialize();
    }

    return dataSource;
}


