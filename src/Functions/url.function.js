/**
    * Checks if a given URL string is valid.
    * @param {string} url The URL string to validate.
    * @returns {boolean} Returns true if the URL is valid, otherwise returns false.
*/
export const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*(\?.*)?$/;
    return urlPattern.test(url);
}
