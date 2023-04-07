//error handler for controller functions
//used by returning constructor (new ErrorHandler(message,statuscode)) wrapped in next.
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
