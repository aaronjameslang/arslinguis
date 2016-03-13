var Q = require('q');
var liburl = require('url');

var authenticate = require('./authenticate.js');
var db = require('./db.js');
var errors = require('./errors.js');
var format = require('./format.js');
var getCriteria = require('./getCriteria.js');
var logger = require('./logger.js');

module.exports = handleRequest;

function handleRequest(request, response) {
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
    var criteria = getCriteria(urlPath);
    var methodName = criteria.id ? 'findOne' : 'find';
    var format_ = format.bind(null, request, response);
    return db[methodName](criteria)
        .then(format_);
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
