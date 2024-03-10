import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { importRoutes } from '../Config/routeHandler.config.js';
import { corsConfig } from '../Middlewares/cors.middleware.js';
import { rateLimitMiddleware } from '../Middlewares/rateLimiter.middleware.js';
import { dbConnection } from '../Database/connection.js';

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 4000;
const router = express.Router();
importRoutes(router);

app
    .set('port', PORT)
    // .use(corsConfig)
    .use(rateLimitMiddleware)
    .use(express.json())
    .use(morgan('combined'))
    .use(router)

export default app;
