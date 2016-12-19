var AuthenticationError = require('./errors.js').AuthenticationError
var AuthorisationError = require('./errors.js').AuthorisationError
var NotFoundError = require('./errors.js').NotFoundError

module.exports = authorise

function authorise (type, method, userId) {
  if (!delegates[type]) {
    throw new NotFoundError('Unrecognised type: ' + type) // No an auth error
  }
  if (!delegates[type][method]) {
    throw new NotFoundError('Unrecognised action: ' + method) // No an auth error
  }
  let delegate = delegates[type][method]
  let authorised = delegate(userId)
  if (authorised) return
  if (userId) throw new AuthorisationError('Permission denied')
  throw new AuthenticationError('Permission denied, try logging in')
}

function allow () {
  return true
}

function requireLogin (userId) {
  return !!userId
}

var delegates = {
  'language': {
    'GET': requireLogin
  },
  'user': {
    'GET': allow
  }
}

