import { dbConnection } from './connection.js';
import { validateResults, handleQueryError } from './function.db.js';

export const getUrlRecords = async () => {
    try {
        const sql = `
            SELECT *
            FROM url
        `;

        const { results } = await dbConnection.query(sql);

        validateResults('getUrlRecords', results);

        return results;

    } catch (error) {
        handleQueryError('getUrlRecords', error);
    }
};

export const createUrlRecord = async (url, shortenedUrl, codeUrl, expirationDate) => {
    try {
        const sql = `
            INSERT INTO url (long_url, short_url, code_url, expiration_date) 
            VALUES (?, ?, ?, ?)
        `;
        const params = [url, shortenedUrl, codeUrl, expirationDate];

        const { results } = await dbConnection.query(sql, params);

        return results.insertId;

    } catch (error) {
        handleQueryError('createUrlRecord', error);
    }
};

export const findOriginalUrlByShortenedCode = async (codeUrl) => {
    try {
        const sql = `
            SELECT *
            FROM url
            WHERE code_url = ?
        `;
        const params = [codeUrl];

        const { results } = await dbConnection.query(sql, params);

        validateResults('findOriginalUrlByShortenedCode', results);

        return results;

    } catch (error) {
        handleQueryError('findOriginalUrlByShortenedCode', error);
    }
}
