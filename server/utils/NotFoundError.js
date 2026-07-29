import AppError from "./AppError.js";

class NotFoundError extends AppError {
  constructor(message, code) {
    super(404, message);
  }
}

export default NotFoundError;
