const Q = require('q')
const AuthenticationError = require('./errors.js').AuthenticationError
const assertPasswordIsCorrect = require('./authenticate/assertPasswordIsCorrect')
const repository = require('./authenticate/repository')
const requestParser = require('./authenticate/requestParser')

module.exports = authenticate

/**
 * Middleware
 * @param request
 * @return {Promise.<{sessionId, userId}>}
 */
function authenticate (request) {
  const sessionId = requestParser.getSessionId(request)
  if (sessionId) {
    return authenticateSession(sessionId)
  }

  const credential = requestParser.getCredential(request)
  if (credential) {
    return authenticateCredential(credential)
  }

  return Q(null)
}

/**
 * @param sessionId
 * @return {Promise.<Session>}
 */
function authenticateSession (sessionId) {
  return repository.getSessionById(sessionId)
    .then(function (session) {
      if (!session) {
        throw new AuthenticationError('Unauthorised session ID: ' + sessionId)
      }
      return session
    })
}

/**
 * @param suppliedCredential
 * @return {Promise.<Session>}
 */
function authenticateCredential (suppliedCredential) {
  let userId
  return repository.getCredential(suppliedCredential.username)
    .then(function (storedCredential) {
      userId = storedCredential.userId
      if (!storedCredential) {
        const message = 'Unknown username: ' + suppliedCredential.username
        throw new AuthenticationError(message)
      }
      return assertPasswordIsCorrect(suppliedCredential.password, storedCredential.hashcode)
    }).then(() => {
      return repository.createSession(userId)
    })
}
