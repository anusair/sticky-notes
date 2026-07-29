class AppError extends Error {
    constructor (statusCode , message , code) {
        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
    }
}

export default AppError;

