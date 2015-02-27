var bcrypt = require('bcrypt');
var Q = require('q');

var credentialCodec = require('arsl/src/credentialCodec.js');
var db = require('arsl/src/db.js');
var genId = require('arsl/src/genId.js');
var getCookie = require('arsl/src/getCookie.js');

var hash = Q.nbind(bcrypt.hash, bcrypt);
var COOKIE_NAME = 'arslinguis-session-id';

AuthenticationError = function() {
	//Error.apply(this, arguments);
	this.message = arguments[0];
};
AuthenticationError.prototype = Object.create(Error.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;
AuthenticationError.prototype.name = 'AuthenticationError';

module.exports = authenticate;

function authenticateSession(sessionId) {
	return db.findOne({id:sessionId, type:'session'})
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
	var criteria = {username:actualCredential.username};
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
			ctime: Date.now()
		};
		return db.insert(session);
	})
	.then(function() {
		return session;
	});
}


function authenticateOrReject(request) {
	var sessionId = getCookie(request, COOKIE_NAME);
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

function authenticate(request, response) {
	return authenticateOrReject(request)
	.then(function(session) {
		request.session = session;
	})
	.catch(function(error) {
		if (error.constructor !== AuthenticationError) {
			throw error;
		}
		console.log(error);
		response.statusCode = 401;
		response.statusMessage = error.message;
		response.end();
	});
}
