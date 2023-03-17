const MethodNotAllowedError = require('../errors/method-request')

const methodRequest = (req, res, next) => {
  if (req.method !== req.originalMethod) {
    throw new MethodNotAllowedError('Method not allowed')
  } else {
    next()
  }
}

module.exports = methodRequest
