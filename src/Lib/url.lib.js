import { isValidDate } from '../Functions/date.function.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

/**
    * Generates a unique code of length 10 consisting of alphanumeric characters.
    * @returns {string} Returns the generated unique code.
*/
export const generateUniqueCode = () => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}

/**
    * Generates a shortened URL based on the provided parameters.
    * @param {string} url The original URL.
    * @param {string} baseUrl The base URL to prepend to the shortened code.
    * @param {string} codeUrl The unique code to append to the base URL.
    * @returns {string} Returns the shortened URL.
*/
export const generateShortenedUrl = (url, baseUrl, codeUrl) => {
    // return `${baseUrl || ''}/${codeUrl}`;
    return `${process.env.URL_BASE}/api/v1/u/${codeUrl}`;
}

/**
    * Validates the expiration date in the format "dd/mm/yyyy".
    * @param {string} expirationDate The expiration date to validate.
    * @returns {object} Returns an object indicating whether the expiration date is valid and an optional message.
*/
export const isValidExpirationDate = (expirationDate) => {

    if (!isValidDate(expirationDate)) {
        return {
            isValid: false,
            message: "Invalid expiration date. Please enter a valid date in the format dd/mm/yyyy"
        };
    }

    const [day, month, year] = expirationDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime()) || date <= new Date()) {
        return {
            isValid: false,
            message: "Invalid expiration date. The expiration date must be a valid future date"
        };
    }

    return {
        isValid: true,
        message: "Valid expiration date"
    };
}
