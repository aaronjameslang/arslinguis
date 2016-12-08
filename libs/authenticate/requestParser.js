const credentialCodec = require('./credentialCodec')
const AuthenticationError = require('../errors').AuthenticationError

const COOKIE_NAME = 'arslinguis-session-id'

module.exports = {
  getSessionId: getSessionId,
  getCredential: getCredential
}

function getSessionId (request) {
  return request.cookies[COOKIE_NAME]
}

function getCredential (request) {
  const authorization = request.headers.authorization
  if (!authorization) return authorization
  const authorizationType = authorization.split(' ')[0]
  if (authorizationType.toLowerCase() !== 'basic') {
    const message = 'Unrecognised authorization type: ' + authorizationType
    throw new AuthenticationError(message)
  }
  var b64 = authorization.split(' ')[1]
  var credential = credentialCodec.decode(b64)
  return credential
}
