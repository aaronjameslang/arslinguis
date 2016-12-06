var Q = require('q')
var liburl = require('url')

var authenticate = require('./authenticate.js')
var repository = require('./repository')
var getCriteria = require('./getCriteria.js')
var logger = require('./logger.js')

module.exports = handleRequest

function handleRequest (request, response) {
  // var session
  Q()
    .then(function () {
      logger.logRequest(request)
    })
    .then(function () {
      return authenticate(request)
    })
    .then(function (/* session_*/) {
      // session = session_
      var urlPath = liburl.parse(request.url, true).path
      var criteria = getCriteria(urlPath)
      var methodName = criteria.id ? 'retrieveOne' : 'retrieveMany'
      return repository[methodName](criteria)
    })
    .then(function (data) {
      response.setHeader('content-type', 'application/json')
      var json = JSON.stringify(data)
      response.write(json)
    })
    .catch(function (error) {
      return Q.all(
        logger.logError(error),
        logger.respondWithError(error, response)
      )
    })
    .catch(function (error) {
      return logger.logError(error)
    })
    .finally(function () {
      response.end()
    })
}
