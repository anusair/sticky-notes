import AppError from "./AppError.js";

class ConflictError extends AppError {
    constructor (message , code) {
        super(409 , message , code);
    }
}

export default ConflictError;