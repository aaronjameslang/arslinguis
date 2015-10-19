var _ = require('underscore');
var pmongo = require('promised-mongo');
var Q = require('q');

var db = pmongo('mongodb://127.0.0.1/arslinguis');
var errors = require('./errors.js');
var ArslinguisError = errors.ArslinguisError;

exports.logError = logError;
exports.logRequest = logRequest;
exports.respondWithError = respondWithError;

function logError(error) {
  console.log(new Date(), error);
  process.stdout.write('  ');
  process.stdout.write(error.stack);
  process.stdout.write('\n');
  //process.out.write(error.stack);
  var dbCollection = db.collection('errorLogs');
  var document = _.pick('name', 'message', 'stack', 'code');
  return dbCollection.insert(document);
}

function logRequest(request) {
  console.log(new Date(), request.method, request.url);
}

function respondWithError(error, response) {
  response.statusCode = 500;
  if (error instanceof ArslinguisError && error.code) {
    response.statusCode = error.code;
    respose.statusMessage = error.message;
  }
  response.write(response.statusCode + ': ' + response.statusMessage);
  return Q.ninvoke(response, 'end');
}
