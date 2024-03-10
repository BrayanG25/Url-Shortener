import { generateUniqueCode, generateShortenedUrl, isValidExpirationDate } from '../Lib/url.lib.js';

describe('generateUniqueCode', () => {
    test('should generate a unique code of length 10', () => {
        const code = generateUniqueCode();
        expect(code).toHaveLength(10);
    });

    test('should generate a different code each time', () => {
        const code1 = generateUniqueCode();
        const code2 = generateUniqueCode();
        expect(code1).not.toEqual(code2);
    });
});

describe('generateShortenedUrl', () => {
    test('should generate a shortened URL with the provided base URL and code URL', () => {
        const url = 'https://www.example.com';
        const baseUrl = 'http://localhost:4001';
        const codeUrl = 'ABC123';
        const shortenedUrl = generateShortenedUrl(url, baseUrl, codeUrl);
        expect(shortenedUrl).toBe(`${baseUrl}/api/v1/u/${codeUrl}`);
    });

    test('should generate a shortened URL without a provided base URL', () => {
        const url = 'https://www.example.com';
        const codeUrl = 'ABC123';
        const shortenedUrl = generateShortenedUrl(url, '', codeUrl);
        expect(shortenedUrl).toBe(`http://localhost:4001/api/v1/u/${codeUrl}`);
    });
});

describe('isValidExpirationDate', () => {
    test('should return isValid as false and an error message for an invalid expiration date format', () => {
        const expirationDate = '2023/12/31';
        const validationResult = isValidExpirationDate(expirationDate);
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.message).toBe("Invalid expiration date. Please enter a valid date in the format dd/mm/yyyy");
    });

    test('should return isValid as false and an error message for an expiration date in the past', () => {
        const expirationDate = '01/01/2000';
        const validationResult = isValidExpirationDate(expirationDate);
        expect(validationResult.isValid).toBe(false);
        expect(validationResult.message).toBe("Invalid expiration date. The expiration date must be a valid future date");
    });

    test('should return isValid as true and a success message for a valid future expiration date', () => {
        const expirationDate = '31/12/2024';
        const validationResult = isValidExpirationDate(expirationDate);
        expect(validationResult.isValid).toBe(true);
        expect(validationResult.message).toBe("Valid expiration date");
    });
});
