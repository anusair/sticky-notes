import AppError from "./AppError.js";

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized" , code) {
    super(401, message , code);
  }
}

export default UnauthorizedError;