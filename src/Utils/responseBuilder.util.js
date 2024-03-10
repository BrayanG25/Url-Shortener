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

export const sendStandardResponse = async (res, success, message, status = null, data = null) => {
    const responseStatus = status || (success ? 200 : 500);
    const responseFunction = success ? buildSuccessResponse : buildErrorResponse;
    const responseObject = responseFunction(message, data, responseStatus);
    
    res.status(responseStatus).json(responseObject);
    return responseObject;
}
