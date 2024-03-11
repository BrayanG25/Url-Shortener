/**
    * Checks if a given year is a leap year.
    * @param {number} year The year to check.
    * @returns {boolean} Returns true if the year is a leap year, otherwise returns false.
*/
const isLeapYear = (year) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

/**
    * Checks if the given day and month combination is valid for the given year.
    * @param {number} day The day.
    * @param {number} month The month.
    * @param {number} year The year.
    * @returns {boolean} Returns true if the combination is valid, otherwise returns false.
*/
const isValidDayMonthCombination = (day, month, year) => {
    const monthsWith30Days = [4, 6, 9, 11];
    const februaryDays = isLeapYear(year) ? 29 : 28;

    if (month === 2) {
        return day <= februaryDays;
    }
    
    return !monthsWith30Days.includes(month) || day <= 30;
}

/**
    * Checks if a given date string is in a valid format and represents a valid date.
    * @param {string} date The date string in the format 'dd/mm/yyyy'.
    * @returns {boolean} Returns true if the date is valid, otherwise returns false.
*/
export const isValidDate = (date) => {
    const [day, month, year] = date.split('/').map(Number);
    
    const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    const isValidDayMonthYear = (day >= 1 && day <= 31) && (month >= 1 && month <= 12) && year >= 1000;
    const isValidCombination = isValidDayMonthYear && isValidDayMonthCombination(day, month, year);

    return isValidFormat && isValidDayMonthYear && isValidCombination;
}

/**
    * Converts a date string from the format 'dd/mm/yyyy' to 'yyyy-mm-dd'.
    * @param {string} date The date string in the format 'dd/mm/yyyy'.
    * @returns {string} Returns the date string in the format 'yyyy-mm-dd'.
*/
export const convertToMySQLDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
