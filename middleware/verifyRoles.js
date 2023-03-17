const ForbiddenError = require('../errors/forbidden')

const verifyRoles = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new ForbiddenError('Request not allowed')
  } else {
    next()
  }
}

module.exports = verifyRoles
