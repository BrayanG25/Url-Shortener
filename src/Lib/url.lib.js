import { isValidDate } from '../Functions/date.function.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const generateUniqueCode = () => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}

export const generateShortenedUrl = (url, baseUrl, codeUrl) => {
    // return `${baseUrl || ''}/${codeUrl}`;
    return `${process.env.URL_BASE}/api/v1/u/${codeUrl}`;
}

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
