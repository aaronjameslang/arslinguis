var db = require('./db.js');

exports.ArslinguisError = ArslinguisError;
exports.AuthenticationError = AuthenticationError;
exports.ContentNegotiationError = ContentNegotiationError;

function ArslinguisError() {
  // Error.apply(this, arguments);
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

function ContentNegotiationError() {
  ArslinguisError.apply(this, arguments);
}
ContentNegotiationError.prototype = Object.create(ArslinguisError.prototype);
ContentNegotiationError.prototype.constructor = ContentNegotiationError;
ContentNegotiationError.prototype.name = 'ContentNegotiationError';
ContentNegotiationError.prototype.code = 400; // TODO
