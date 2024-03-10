import { dirname, join } from 'node:path';
import { fileURLToPath  } from 'node:url';
import { createWriteStream } from 'node:fs';
import { sendStandardResponse } from '../Utils/responseBuilder.util.js';

const blockedIPLogPath = join(dirname(fileURLToPath(import.meta.url)), 'blocked_ip.log');
const ipRequestTracker = {};

export const rateLimitMiddleware = (req, res, next) => {
    const { ip } = req;
    const currentTime = Date.now();
    const windowMs = 60 * 1000;
    const maxRequestsPerWindow = 20;

    ipRequestTracker[ip] = ipRequestTracker[ip]?.filter(request => {
        return request.timestamp > currentTime - windowMs;
    }) || [];

    if (ipRequestTracker[ip].length >= maxRequestsPerWindow) {
        const blockedIPLogStream = createWriteStream(blockedIPLogPath, { flags: 'a' });
        blockedIPLogStream.write(`${ip} - ${new Date().toISOString()}\n`);
        blockedIPLogStream.end();

        console.log(`Blocked request from: ${ip}`);
        
        if (!res.headersSent) {
            sendStandardResponse(res, false, 'Too Many Requests', 429);
        }
    }

    ipRequestTracker[ip].push({ timestamp: currentTime });
    next();
};
