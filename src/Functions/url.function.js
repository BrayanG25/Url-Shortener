export const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*(\?.*)?$/;
    return urlPattern.test(url);
}