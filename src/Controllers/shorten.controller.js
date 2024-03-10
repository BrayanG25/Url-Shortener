import { sendStandardResponse } from '../Utils/responseBuilder.util.js';
import { getUrlRecords, createUrlRecord } from '../Database/url.db.js'
import { generateUniqueCode, generateShortenedUrl, isValidExpirationDate } from '../Lib/url.lib.js';
import { isValidUrl } from '../Functions/url.function.js';
import { convertToMySQLDate } from '../Functions/date.function.js';

export const getUrl = async (req, res) => {
    try {
        const response = await getUrlRecords();
        sendStandardResponse(res, true, 'URLs retrieved', 200, response);

    } catch (error) {
        console.error('Error getting URL(s)', error);
        sendStandardResponse(res, false, 'Internal server error', 500, { error: error.message });
    }
}

export const createUrl = async (req, res) => {
    try {
        const requiredKeys = ['url', 'baseUrl'];
        const missingKeys = requiredKeys.filter(key => !(key in req.body));

        if (missingKeys.length > 0) {
            return sendStandardResponse(res, false, `Missing keys: ${missingKeys.join(', ')}`, 400);
        }

        const { url, baseUrl, expirationDate } = req.body;

        if (!isValidUrl(url)) {
            return sendStandardResponse(res, false, 'Invalid URL', 400);
        }

        if (expirationDate) {
            const validation = isValidExpirationDate(expirationDate);
            if (!validation.isValid) {
                return sendStandardResponse(res, false, validation.message, 400);
            }
        }

        const codeUrl = generateUniqueCode();
        const shortenedUrl = generateShortenedUrl(url, baseUrl, codeUrl);
        const mysqlDate = expirationDate ? convertToMySQLDate(expirationDate) : null;
        const insertId = await createUrlRecord(url, shortenedUrl, codeUrl, mysqlDate);

        if (!res.headersSent) {
            sendStandardResponse(res, true, 'URL created', 201, {
                originalUrl: url,
                shortenedUrl: shortenedUrl,
                codeUrl: codeUrl,
                insertId
            });
        }

    } catch (error) {
        console.error('Error creating URL:', error);
        sendStandardResponse(res, false, 'Internal server error', 500, { error: error.message });
    }
}

export const updateUrl = (req, res) => {
    try {
        sendStandardResponse(res, true, 'Url updated', 200);

    } catch (error) {
        console.error('Error updating Url', error);
        sendStandardResponse(res, false, 'Internal server error', 500, { error: error.message });
    }
}

export const deleteUrl = async (req, res) => {
    try {
        sendStandardResponse(res, true, 'Url deleted', 200);

    } catch (error) {
        console.error('Error deleting Url', error);
        sendStandardResponse(res, false, 'Internal server error', 500, { error: error.message });
    }
}