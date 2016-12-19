var Q = require('q')
var liburl = require('url')

var authenticate = require('./authenticate.js')
var authorise = require('./authorise')
var db = require('./db.js')
var getCriteria = require('./getCriteria.js')
var logger = require('./logger.js')

module.exports = handleRequest

function handleRequest (request, response) {
  const urlPath = liburl.parse(request.url, true).path
  const criteria = getCriteria(urlPath)
  Q()
    .then(function () {
      logger.logRequest(request)
    })
    .then(() => authenticate(request))
    .then(session => {
      authorise(criteria.type, request.method, session.userId)
    }).then(function () {
      const methodName = criteria.id ? 'findOne' : 'find'
      return db[methodName](criteria)
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
