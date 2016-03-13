var bcrypt = require('bcrypt');
var Q = require('q');

var credentialCodec = require('./authenticate/credentialCodec.js');
var db = require('./db.js');
var AuthenticationError = require('./errors.js').AuthenticationError;
var genId = require('node-uuid').v4;

var hash = Q.nbind(bcrypt.hash, bcrypt);
var COOKIE_NAME = 'arslinguis-session-id';

module.exports = authenticate;

function authenticateSession(sessionId) {
  return db.findOne({id: sessionId, type: 'session'})
  .then(function(session) {
    if (!session) {
      throw new AuthenticationError('Unauthorised session ID: ' + sessionId);
    }
    return session;
  });
}

function authenticateAuthorization(authorization) {
  var authorizationType = authorization.split(' ')[0];
  if (authorizationType.toLowerCase() !== 'basic') {
    var message = 'Unauthorised authorization type: ' + authorizationType;
    var error = new AuthenticationError(message);
    return Q.reject(error);
  }
  var b64 = authorization.split(' ')[1];
  var credential = credentialCodec.decode(b64);
  return authenticateCredential(credential);
}

function authenticateCredential(actualCredential) {
  var criteria = {username: actualCredential.username};
  if (actualCredential.domain) {
    criteria.domain = actualCredential.domain;
  }
  var session;
  var expectedCredential;
  return db.findOne(criteria)
  .then(function(expectedCredential_) {
    expectedCredential = expectedCredential_;
    if (!expectedCredential) {
      var message = 'Unauthorised username: ' + actualCredential.username;
      throw new AuthenticationError(message);
    }
    return hash(actualCredential.password, expectedCredential.hashcode);
  })
  .then(function(actualHashcode) {
    if (actualHashcode !== expectedCredential.hashcode) {
      throw new AuthenticationError('Unauthorised password');
    }
    session = {
      id: genId(),
      type: 'session',
      userId: expectedCredential.userId,
      ctime: Date.now(),
    };
    return db.insert(session);
  })
  .then(function() {
    return session;
  });
}

function authenticate(request) {
  var sessionId = request.cookies[COOKIE_NAME];
  if (sessionId) {
    return authenticateSession(sessionId);
  }

  var authorization = request.headers.authorization;
  console.log('authorization: ', authorization);
  if (authorization) {
    return authenticateAuthorization(authorization);
  }

  return Q(null);
}
