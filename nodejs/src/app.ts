import express from 'express';
import cors from 'cors';
import { MssqlSource } from './data-source/mssql';
import { MysqlSource } from './data-source/mysql';
import { OracleSource } from './data-source/oracle';
import { PostgresSource } from './data-source/postgres';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../dist/swagger.json'; // Adjust path as needed

export async function createApp() {
    try {
        console.log('...');
        await MssqlSource.initialize();
        console.log('MSSQL DataSource initialized');
        await MysqlSource.initialize();
        console.log('Mysql DataSource initialized');
        await OracleSource.initialize();
        console.log('Oracle DataSource initialized');
        await PostgresSource.initialize();
        console.log('Postgres DataSource initialized');

        const app = express();
        app.use(cors());
        app.use(express.json());
        RegisterRoutes(app);
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        return app;
    } catch (error) {
        console.error('Error initializing DataSource:', error);
        process.exit(1); // exit if DB connection fails
    }
}
