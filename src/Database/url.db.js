import { dbConnection } from './connection.js';
import { validateResults, handleQueryError } from './function.db.js';

/**
    * Retrieves all URL records from the database.
    * @function getUrlRecords
    * @returns {Promise<Array<Object>>} A promise that resolves to an array of URL records.
    * @throws {Error} Throws an error if the database query fails or returns no records.
*/
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

/**
    * Creates a new URL record in the database.
    * @function createUrlRecord
    * @param {string} url The original URL.
    * @param {string} shortenedUrl The shortened URL.
    * @param {string} codeUrl The code URL.
    * @param {string} expirationDate The expiration date of the URL.
    * @returns {Promise<number>} A promise that resolves to the ID of the newly created record.
    * @throws {Error} Throws an error if the database query fails.
*/
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

/**
    * Finds the original URL record in the database by its shortened code.
    * @function findOriginalUrlByShortenedCode
    * @param {string} codeUrl The code URL of the shortened URL.
    * @returns {Promise<Array>} A promise that resolves to an array containing the original URL record.
    * @throws {Error} Throws an error if the database query fails or if no records are found.
*/
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
