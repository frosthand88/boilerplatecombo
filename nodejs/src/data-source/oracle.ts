import { DataSource } from 'typeorm';
import { ResearcherSchema3 } from '../entity/Researcher3';
import dotenv from 'dotenv';

dotenv.config();

export const OracleSource = new DataSource({
    type: 'oracle',
    username: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECTION_STRING, // <- use this
    synchronize: false,
    entities: [ResearcherSchema3],
});
