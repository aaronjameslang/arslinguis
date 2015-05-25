#! /usr/bin/env node

var fs = require('fs');
var http = require('http');
var Q = require('q');
var liburl = require('url');

var authenticate = require('./libs/authenticate.js');
var config = require('./config.js');
var db = require('./libs/db.js');
var errors = require('./libs/errors.js');
var format = require('./libs/format.js');
var getCriteria = require('./libs/getCriteria.js');
var logger = require('./libs/logger.js');
var staticFiles = require('./libs/static.js');

process.title = 'arslinguis';

fs.writeFileSync(config.pidFile || 'pid', process.pid);

var server = http.createServer(main);

server.listen(config.bindTo);

function main(request, response) {
	var session;
	Q()
	.then(function() {
		logger.logRequest(request);
	})
	.then(function() {
		return authenticate(request);
	})
	.then(function(session_) {
		session = session_;
		var urlPath = liburl.parse(request.url, true).path;
		var isStatic = /^\/static\//.test(urlPath);
		var urlPathParts = urlPath.split('/');
		if (isStatic) {
			return serveStaticResponse (request, response, urlPath);
		} else {
			return serveDynamicResponse(request, response, urlPath);
		}
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
}

function serveStaticResponse(request, response, urlPath) {
	var filepath = require.resolve(files[urlPath]);
	var readable = fs.createReadStream(filepath);
	var writeable = response;
	return promisePipe(readable, writeable);
}

function serveDynamicResponse(request, response, urlPath) {
	var criteria = getCriteria(urlPath);
	var methodName = criteria.id ? 'findOne' : 'find';
	var format_ = format.bind(null, request, response);
	return db[methodName](criteria)
	.then(format_);
}
