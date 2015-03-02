var db = require('arsl/src/db.js');

exports.ArslinguisError = ArslinguisError;
exports.AuthenticationError = AuthenticationError;
exports.logToDatabase = logToDatabase;
exports.logToResponse = logToResponse;
exports.logToWritable = logToWritable;

function ArslinguisError() {
	//Error.apply(this, arguments);
	if (arguments.length) {
		this.message = arguments[0];
	}
}
ArslinguisError.prototype = Object.create(Error.prototype);
ArslinguisError.prototype.constructor = ArslinguisError;
ArslinguisError.prototype.name = 'ArslinguisError';

function AuthenticationError() {
	ArslinguisError.apply(this, arguments);
}
AuthenticationError.prototype = Object.create(ArslinguisError.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;
AuthenticationError.prototype.name = 'AuthenticationError';
AuthenticationError.prototype.code = 401;

function logToDatabase(error, db) {

}

function logToResponse(error, response) {

}

function logToWritable(error, writable) {
	writable.write(error.toString() + '\n');
}
