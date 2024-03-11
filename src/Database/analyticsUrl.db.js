import { dbConnection } from './connection.js';
import { handleQueryError } from './function.db.js';

/**
    * Logs analytics data for a URL access.
    * @function logAnalytics
    * @param {number} urlId - The ID of the URL for which analytics data is being logged.
    * @param {string} ipAddress - The IP address of the user accessing the URL.
    * @param {string} userAgent - The user agent string identifying the browser or client.
    * @returns {Promise<void>} A Promise that resolves when the analytics data is successfully logged.
*/
export const logAnalytics = async (urlId, ipAddress, userAgent) => {
    try {
        const sql = `
            INSERT INTO analytic_url (url_id, access_time, ip_address, user_agent)
            VALUES (?, CURRENT_TIMESTAMP(), ?, ?)
        `;
        const params = [urlId, ipAddress, userAgent];
        await dbConnection.query(sql, params);

    } catch (error) {
        handleQueryError('logAnalytics', error);
    }
}
