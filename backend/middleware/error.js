//middleware to catch errors in routing/API calls.
const ErrorHandler = require("../utils/errorHandeler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //worng MongoDB id error.
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //worng jwt error
  // if(err.code="JsonWebTokenError"){
  //   const message='Json Web Token is invalid, try again'
  //   err=new ErrorHandler(message,400)
  // }

  //jwt EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is expired,, try again";
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
