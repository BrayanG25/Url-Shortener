const buildSuccessResponse = (message, data = null, status = 200) => ({
    success: true,
    status,
    message,
    data
});

const buildErrorResponse = (message, data = null, status = 500) => ({
    success: false,
    status,
    error: { message },
    data
});

/**
    * Sends a standardized JSON response with a success or error status.
    * @async
    * @function sendStandardResponse
    * @param {object} res - The response object from Express.
    * @param {boolean} success - Indicates whether the operation was successful.
    * @param {string} message - A message describing the result of the operation.
    * @param {number} [status] - The HTTP status code for the response. Defaults to 200 for success and 500 for error.
    * @param {object|null} [data] - Additional data to include in the response.
    * @returns {Promise<object>} The response object sent to the client.
*/
export const sendStandardResponse = async (res, success, message, status = null, data = null) => {
    const responseStatus = status || (success ? 200 : 500);
    const responseFunction = success ? buildSuccessResponse : buildErrorResponse;
    const responseObject = responseFunction(message, data, responseStatus);
    
    res.status(responseStatus).json(responseObject);
    return responseObject;
}
