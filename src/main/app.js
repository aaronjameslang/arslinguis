var fs = require('fs');
var http = require('http');
var Q = require('q');

var authenticate = require('arsl/src/authenticate.js');
var config = require('arsl/config.js');
var db = require('arsl/src/db.js');
var errors = require('arsl/src/errors.js');
var formatter = require('arsl/src/formatter.js');
var getCriteria = require('arsl/src/getCriteria.js');
var logger = require('arsl/src/logger.js');

process.title = 'arslinguis';

fs.writeFileSync(config.pidFile || 'pid', process.pid);

var server = http.createServer(function(request, response) {
	var session;
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
	.then(function(session_) {
		session = session_;
		var criteria = getCriteria(request.url);
		var methodName = criteria.id ? 'findOne' : 'find';
		return db[methodName](criteria);
	})
	.then(function(data) {
		formatter.format(data, response);
	})
	.catch(function(error) {
		return Q.all(
			logger.logError(error),
			logger.respondWithError(error, response)
		);
	})
	.catch(function(error) {
		return logger.logError(error);
	})
	.finally(function() {
		response.end();
	});
});

server.listen(config.bindTo);
