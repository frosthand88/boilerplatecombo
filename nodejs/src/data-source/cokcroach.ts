import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {CockroachResearcherSchema} from "../entity/CockroachResearcher";

dotenv.config();

let dataSource: DataSource | null = null;

export async function getCockroachSource(): Promise<DataSource> {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'cockroachdb',
            host: process.env.COCKROACH_HOST,
            port: Number(process.env.COCKROACH_PORT),
            username: process.env.COCKROACH_USER,
            password: process.env.COCKROACH_PASSWORD,
            database: process.env.COCKROACH_DATABASE,
            ssl: {
                rejectUnauthorized: false
            },
            synchronize: false,
            logging: true,
            entities: [CockroachResearcherSchema],
            timeTravelQueries: false
        });

        await dataSource.initialize();
    }

    return dataSource;
}


