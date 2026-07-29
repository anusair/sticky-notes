const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
  res.status(statusCode).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
