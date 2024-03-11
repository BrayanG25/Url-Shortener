import { sendStandardResponse } from '../Utils/responseBuilder.util.js';

/**
    * Middleware function to handle requests for routes that are not found (404 - Not Found).
    * @param {object} req - The request object.
    * @param {object} res - The response object.
    * @param {function} next - The next middleware function in the application's request-response cycle.
    * @returns {void}
*/
export const notFoundMiddleware = (req, res, next) => {
    sendStandardResponse(res, false, '404 - Not Found', 404);
};
