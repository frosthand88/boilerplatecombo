import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../dist/swagger.json';
import { injectSecretsFromAWS } from "./utils/loadSecrets"; // Adjust path as needed

export async function createApp() {
    try {
        console.log('Injecting AWS Secrets...');
        await injectSecretsFromAWS();

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
