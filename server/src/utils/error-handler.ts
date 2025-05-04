export default class ErrorHandler extends Error {
  statusCode = 500;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the name of this error is set to the class name
    this.name = this.constructor.name;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
