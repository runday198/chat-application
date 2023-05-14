import BaseError from "./BaseError.js";

class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = 404,
    description = "Not Found.",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

export default Api404Error;
