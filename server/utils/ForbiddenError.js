import AppError from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(message) {
    super(403, message);
  }
}

export default ForbiddenError;
