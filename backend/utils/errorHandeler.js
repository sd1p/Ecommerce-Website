//error handler for controller functions 
//used by returning constructor (new ErrorHandler(messege,statuscode)) wrapped in next.
class ErrorHandler extends Error{
    constructor(messege,statusCode)
    {
        super(messege);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports =ErrorHandler