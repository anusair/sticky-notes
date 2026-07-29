import AppError from "./AppError.js";

class ValidationError extends AppError {
  constructor(message, code) {
    super(400, message, code);
  }
}

export default ValidationError;
