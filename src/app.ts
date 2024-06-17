import express from 'express'
import routes from './routes/index.js';
import { db } from './config/postgresDb.js';

const app = express();

db
    .initialize()
    .then(() => console.log('Database has been initialized!'))
    .catch((err) => console.error('Error during database initialized!', err));

routes(app);

export default app;