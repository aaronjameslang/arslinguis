const AuthenticationError = require('./errors.js').AuthenticationError
const AuthorisationError = require('./errors.js').AuthorisationError
const NotFoundError = require('./errors.js').NotFoundError
const MethodNotAllowedError = require('./errors.js').MethodNotAllowedError

module.exports = authorise

function authorise (type, method, userId) {
  if (!delegates[type]) {
    throw new NotFoundError('Unrecognised type: ' + type) // Not an auth error
  }
  if (!delegates[type][method]) {
    throw new MethodNotAllowedError('Unrecognised action: ' + method) // Not an auth error
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

