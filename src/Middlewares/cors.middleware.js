import { dirname, join } from 'node:path';
import { fileURLToPath  } from 'node:url';
import fs from 'node:fs/promises';
import cors from 'cors';

const allowedOrigins = ['http://localhost:4001'];
const __dirname = dirname(fileURLToPath(import.meta.url));

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
                callback(null, true);

        } else {
            const blockedOrigin = origin || 'Unknown';
            const logFilePath = join(__dirname, 'blocked_origins.log');

            fs.appendFile(logFilePath, blockedOrigin + '\n').catch(err => {
                console.error('Error writing to blocked origins log:', err);
            });

            console.log(`Blocked request from: ${blockedOrigin}`);
            
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST']
};

/**
    * Configures CORS (Cross-Origin Resource Sharing) middleware with custom options.
    * @param {object} req - The request object.
    * @param {object} res - The response object.
    * @param {function} next - The next middleware function in the application's request-response cycle.
    * @returns {void}
*/
export const corsConfig = cors(corsOptions);
