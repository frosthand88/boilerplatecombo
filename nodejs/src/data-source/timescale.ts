import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {ResearchActivitySchema} from "../entity/ResearchActivity";

dotenv.config();

let dataSource: DataSource | null = null;

export async function getTimescaleSource(): Promise<DataSource> {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'postgres',
            host: process.env.TIMESCALE_HOST,
            port: Number(process.env.TIMESCALE_PORT),
            username: process.env.TIMESCALE_USER,
            password: process.env.TIMESCALE_PASSWORD,
            database: process.env.TIMESCALE_DATABASE,
            synchronize: false,
            entities: [ResearchActivitySchema],
        });

        await dataSource.initialize();
    }

    return dataSource;
}


