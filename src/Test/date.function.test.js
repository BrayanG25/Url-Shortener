import { isValidDate, convertToMySQLDate } from '../Functions/date.function.js';

describe('isValidDate', () => {
    test('should return true for valid dates', () => {
        expect(isValidDate('31/12/2022')).toBe(true);
        expect(isValidDate('29/02/2024')).toBe(true); // Leap year
    });

    test('should return false for invalid dates', () => {
        expect(isValidDate('32/01/2022')).toBe(false); // Invalid day
        expect(isValidDate('31/04/2022')).toBe(false); // Invalid month
        expect(isValidDate('30/02/2022')).toBe(false); // February with 30 days
        expect(isValidDate('29/02/2023')).toBe(false); // Not a leap year
        expect(isValidDate('29/02/2021')).toBe(false); // Not a leap year
        expect(isValidDate('31/12/99')).toBe(false); // Year must be >= 1000
    });

    test('should return false for invalid format', () => {
        expect(isValidDate('31-12-2022')).toBe(false); // Invalid format
        expect(isValidDate('31122022')).toBe(false); // Invalid format
        expect(isValidDate('31/12/22')).toBe(false); // Year must have 4 digits
    });
});

describe('convertToMySQLDate', () => {
    test('should convert date format to MySQL format', () => {
        expect(convertToMySQLDate('31/12/2022')).toBe('2022-12-31');
        expect(convertToMySQLDate('01/01/2023')).toBe('2023-01-01');
        expect(convertToMySQLDate('29/02/2024')).toBe('2024-02-29');
    });
});