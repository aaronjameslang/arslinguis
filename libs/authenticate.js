var bcrypt = require('bcrypt')
var Q = require('q')

var credentialCodec = require('./authenticate/credentialCodec.js')
var AuthenticationError = require('./errors.js').AuthenticationError
const repository = require('./authenticate/repository')

var hash = Q.nbind(bcrypt.hash, bcrypt)
var COOKIE_NAME = 'arslinguis-session-id'

module.exports = authenticate

function authenticateSession (sessionId) {
  return repository.getSessionById(sessionId)
    .then(function (session) {
      if (!session) {
        throw new AuthenticationError('Unauthorised session ID: ' + sessionId)
      }
      return session
    })
}

function authenticateAuthorization (authorization) {
  var authorizationType = authorization.split(' ')[0]
  if (authorizationType.toLowerCase() !== 'basic') {
    var message = 'Unauthorised authorization type: ' + authorizationType
    var error = new AuthenticationError(message)
    return Q.reject(error)
  }
  var b64 = authorization.split(' ')[1]
  var credential = credentialCodec.decode(b64)
  return authenticateCredential(credential)
}

function authenticateCredential (actualCredential) {
  var expectedCredential
  return repository.getCredential(actualCredential.username, actualCredential.domain)
    .then(function (expectedCredential_) {
      expectedCredential = expectedCredential_
      if (!expectedCredential) {
        var message = 'Unauthorised username: ' + actualCredential.username
        throw new AuthenticationError(message)
      }
      return hash(actualCredential.password, expectedCredential.hashcode)
    })
    .then(function (actualHashcode) {
      if (actualHashcode !== expectedCredential.hashcode) {
        throw new AuthenticationError('Unauthorised password')
      }
      return repository.createSession(expectedCredential.userId)
    })
}

function authenticate (request) {
  var sessionId = request.cookies[COOKIE_NAME]
  if (sessionId) {
    return authenticateSession(sessionId)
  }

  var authorization = request.headers.authorization
  if (authorization) {
    return authenticateAuthorization(authorization)
  }

  return Q(null)
}
