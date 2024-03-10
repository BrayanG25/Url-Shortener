import { dbConnection } from './connection.js';
import { handleQueryError } from './function.db.js';

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