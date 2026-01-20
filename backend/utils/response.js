const response = (statusCode, data, message, errorMessage) => {
    return {
        status: statusCode,
        success: statusCode >= 200 && statusCode < 300,
        message:message,
        data: data || null,
        error: errorMessage || null
    };
};

export default response;