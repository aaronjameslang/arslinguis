var pmongo = require('promised-mongo');

var db = pmongo('mongodb://127.0.0.1/arslinguis');
var errors = require('arsl/src/errors.js');
var ArslinguisError = errors.ArslinguisError;

exports.logError = logError;
exports.logRequest = logRequest;
exports.respondWithError = respondWithError;

function logError(error) {
	var dbCollection = db.collection('errorLogs');
	var document = _.pick('name', 'message', 'stack', 'code');
	return dbCollection.insert(document);
}

function logRequest(request) {
	console.log(new Date(), request.method, request.url);
}

function respondWithError(error, reponse) {
	response.statusCode = 500;
	if (error instanceof ArslinguisError && error.code) {
		response.statusCode = error.code;
		respose.statusMessage = error.message;
	}
	reponse.write(code + ': ' + message);
	return Q.ninvoke(response, 'end');
}
