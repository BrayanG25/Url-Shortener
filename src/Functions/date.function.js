const isLeapYear = (year) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

const isValidDayMonthCombination = (day, month, year) => {
    const monthsWith30Days = [4, 6, 9, 11];
    const februaryDays = isLeapYear(year) ? 29 : 28;

    if (month === 2) {
        return day <= februaryDays;
    }
    
    return !monthsWith30Days.includes(month) || day <= 30;
}

export const isValidDate = (date) => {
    const [day, month, year] = date.split('/').map(Number);
    
    const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    const isValidDayMonthYear = (day >= 1 && day <= 31) && (month >= 1 && month <= 12) && year >= 1000;
    const isValidCombination = isValidDayMonthYear && isValidDayMonthCombination(day, month, year);

    return isValidFormat && isValidDayMonthYear && isValidCombination;
}

export const convertToMySQLDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}