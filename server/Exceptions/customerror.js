class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Call the parent Error class constructor
        this.name = this.constructor.name; // Set the name of the error
        this.statusCode = statusCode || 500; // Optional HTTP status code
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
}

module.exports = CustomError;
