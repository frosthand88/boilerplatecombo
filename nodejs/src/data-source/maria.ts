import { DataSource } from 'typeorm';
import { ResearcherSchema2 } from '../entity/Researcher2';
import dotenv from 'dotenv';

dotenv.config();

let dataSource: DataSource | null = null;

export async function getMariaSource(): Promise<DataSource> {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'mariadb',
            host: process.env.MARIA_HOST,
            port: Number(process.env.MARIA_PORT),
            username: process.env.MARIA_USER,
            password: process.env.MARIA_PASSWORD,
            database: process.env.MARIA_DATABASE,
            synchronize: false,
            entities: [ResearcherSchema2],
        });

        await dataSource.initialize();
    }

    return dataSource;
}


