const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class MethodNotAllowedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED
  }
}

module.exports = MethodNotAllowedError
