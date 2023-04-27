const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  value = value.replace(/"|'/g, "");
  const message = `${value} is already taken. Use another value!`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Log in again.", 401);

const handleTypeError = () => {
  new AppError("type Error.", 401);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programming or other unknown error: don't leak error details
    // console.error('ERROR: ', err)
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;

  console.log("error.name:  ", error.name);

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
  if (error.name === "TypeError") error = handleTypeError();
  if (err.name === "ValidationError") error = handleValidationErrorDB(error);

  // console.log(error);

  sendErrorProd(error, req, res);
};
