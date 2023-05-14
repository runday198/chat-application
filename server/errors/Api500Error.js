import BaseError from "./BaseError.js";

class Api500Error extends BaseError {
  constructor(
    name,
    statusCode = 500,
    description = "Internal Error.",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

export default Api500Error;
