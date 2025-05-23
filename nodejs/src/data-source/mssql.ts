import { DataSource } from 'typeorm';
import {ResearcherSchema2} from '../entity/Researcher2';
import dotenv from 'dotenv';

dotenv.config();

console.log('MSSQL Config Debug:', {
    MSSQL_USER: process.env.MSSQL_USER,
    MSSQL_PASSWORD: process.env.MSSQL_PASSWORD,
    MSSQL_SERVER: process.env.MSSQL_SERVER,
    MSSQL_DATABASE: process.env.MSSQL_DATABASE,
    MSSQL_PORT: process.env.MSSQL_PORT,
});

export const MssqlSource = new DataSource({
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
