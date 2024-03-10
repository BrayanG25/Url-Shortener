import { sendStandardResponse } from '../Utils/responseBuilder.util.js';

export const notFoundMiddleware = (req, res, next) => {
    sendStandardResponse(res, false, '404 - Not Found', 404);
};