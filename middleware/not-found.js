const { NotFoundError } = require('../errors')

const notFound = (req, res, next) => {
  if (req.url !== req.originalUrl) {
    throw new NotFoundError('Route not found')
  } else {
    next()
  }
}

module.exports = notFound
