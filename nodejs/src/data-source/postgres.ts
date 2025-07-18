import { DataSource } from 'typeorm';
import { ResearcherSchema } from '../entity/Researcher';
import dotenv from 'dotenv';

dotenv.config();

let dataSource: DataSource | null = null;

export async function getPostgresqlSource(): Promise<DataSource> {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            synchronize: false,
            entities: [ResearcherSchema],
        });

        await dataSource.initialize();
    }

    return dataSource;
}


