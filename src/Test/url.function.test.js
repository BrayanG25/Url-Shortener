import { isValidUrl } from '../Functions/url.function.js'

describe('isValidUrl', () => {
    test('should return true for a valid URL', () => {
        const validUrl = 'https://www.example.com';
        expect(isValidUrl(validUrl)).toBe(true);
    });

    test('should return false for an invalid URL', () => {
        const invalidUrl = 'not_a_valid_url';
        expect(isValidUrl(invalidUrl)).toBe(false);
    });
});