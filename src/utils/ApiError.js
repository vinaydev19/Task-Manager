class ApiError extends Error {
  constructor(
    stateCode,
    message = "something want wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.stateCode = stateCode;
    this.data = null;
    this.message = message;
    this.success = errors;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.stack);
    }
  }
}

export { ApiError };
