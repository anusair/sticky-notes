import AppError from "./AppError.js";

class BadRequestError extends AppError {
  constructor(message) {
    super(400, message);
  }
}

export default BadRequestError;