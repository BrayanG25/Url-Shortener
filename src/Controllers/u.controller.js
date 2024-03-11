import { sendStandardResponse } from '../Utils/responseBuilder.util.js';
import { findOriginalUrlByShortenedCode } from '../Database/url.db.js';
import { logAnalytics } from '../Database/analyticsUrl.db.js';

/**
    * Redirects users to the original URL associated with the given shortened code.
    * @function redirectOriginalUrl
    * @param {express.Request} req - The Express request object containing the shortened code in the parameters.
    * @param {express.Response} res - The Express response object used to redirect users or send error responses.
    * @returns {void} This function does not return anything.
*/
export const redirectOriginalUrl = async (req, res) => {
    try {
        const { shortenedCode } = req.params;

        const [ recordUrl ] = await findOriginalUrlByShortenedCode(shortenedCode);

        if (!recordUrl) {
            return sendStandardResponse(res, false, 'URL not found', 404);
        }

        if (recordUrl.expiration_date && new Date(recordUrl.expiration_date) <= new Date()) {
            return sendStandardResponse(res, false, 'URL has expired', 410);
        }

        await logAnalytics(recordUrl.id, req.ip, req.headers['user-agent']);

        res.redirect(301, recordUrl.long_url);

    } catch (error) {
        console.error('Error redirecting original URL:', error);
        sendStandardResponse(res, false, 'Internal server error', 500, { error: error.message });
    }
}
