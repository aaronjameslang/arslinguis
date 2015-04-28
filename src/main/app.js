var fs = require('fs');
var http = require('http');
var Q = require('q');

var authenticate = require('arsl/authenticate.js');
var config = require('arsl/config.js');
var db = require('arsl/db.js');
var errors = require('arsl/errors.js');
var formatter = require('arsl/formatter.js');
var getCriteria = require('arsl/getCriteria.js');
var logger = require('arsl/logger.js');

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
