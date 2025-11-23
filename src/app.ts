

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { errorHandler } from './middlewares/error.middleware';
import dotenv from 'dotenv';
import route from './routes'
dotenv.config()



export function createApp() {
    const app = express();
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(route)
    app.use(errorHandler);


    return app;
}
