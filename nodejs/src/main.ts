import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import { initResearcherModel } from './models/Researcher';
import researcherRoutes from './routes/researcher';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const sequelize = new Sequelize('postgres://frosthand_postgres_username:frosthand_postgres_password@host.docker.internal:5432/frosthand_postgres_db'); // your real DB URL

initResearcherModel(sequelize);

const app = express();
app.use(cors());
app.use(express.json());

app.use(researcherRoutes);

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Researcher API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}`);
        console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
});
