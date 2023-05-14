import BaseError from "./BaseError.js";

class Api400Error extends BaseError {
  constructor(
    name,
    statusCode = 400,
    description = "Bad Request.",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

export default Api400Error;
