var fs = require('fs');
var http = require('http');
var Q = require('q');

var authenticate = require('arsl/src/authenticate.js');
var config = require('arsl/config.js');
var errors = require('arsl/src/errors.js');
var formatter = require('arsl/src/formatter.js');
var logger = require('arsl/src/logger.js');

process.title = 'arslinguis';

fs.writeFileSync(config.pidFile || 'pid', process.pid);

var server = http.createServer(function(request, response) {
	console.log(new Date(), request.method, request.url);
	Q()
	.then(function() {
		logger.logRequest(request);
	})
	.then(function() {
		return formatter.negotiateContent(request, response);
	})
	.then(function() {
		return authenticate(request);
	})
	.then(function(session) {
		// stuff
		response.end();
	})
	.catch(function(error) {
		return Q.all(
			logger.logError(error),
			logger.respondWithError(error, reponse)
		);
	})
	.catch(function(error) {
		return logger.logError(error);
	});
});

server.listen(config.bindTo);
