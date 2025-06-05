import { DataSource } from 'typeorm';
import { ResearcherSchema2 } from '../entity/Researcher2';
import dotenv from 'dotenv';

dotenv.config();

let dataSource: DataSource | null = null;

export async function getMssqlSource(): Promise<DataSource> {
    if (!dataSource) {
        console.log('MSSQL Config Debug (at time of init):', {
            MSSQL_USER: process.env.MSSQL_USER,
            MSSQL_PASSWORD: process.env.MSSQL_PASSWORD,
            MSSQL_SERVER: process.env.MSSQL_SERVER,
            MSSQL_DATABASE: process.env.MSSQL_DATABASE,
            MSSQL_PORT: process.env.MSSQL_PORT,
        });

        dataSource = new DataSource({
            type: 'mssql',
            host: process.env.MSSQL_SERVER,
            port: Number(process.env.MSSQL_PORT),
            username: process.env.MSSQL_USER,
            password: process.env.MSSQL_PASSWORD,
            database: process.env.MSSQL_DATABASE,
            synchronize: false,
            entities: [ResearcherSchema2],
            options: { encrypt: false },
        });

        await dataSource.initialize();
    }

    return dataSource;
}
