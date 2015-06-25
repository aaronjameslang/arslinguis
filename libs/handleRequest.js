var Q = require('q')
var liburl = require('url')

var authenticate = require('./authenticate.js')
var authorise = require('./authorise')
var db = require('./db.js')
var getCriteria = require('./getCriteria.js')
var logger = require('./logger.js')

module.exports = handleRequest

function handleRequest (request, response) {
  // var session
  var urlPath = liburl.parse(request.url, true).path
  var criteria = getCriteria(urlPath)
  Q()
    .then(function () {
      logger.logRequest(request)
    })
    .then(function () {
      return authenticate(request)
    })
    .then(function (session_) {
      // session = session_
      var userId = session_ ? session_.userId : null
      authorise(criteria.type, request.method, userId)
    }).then(function () {
      var urlPath = liburl.parse(request.url, true).path
      var criteria = getCriteria(urlPath)
      var methodName = criteria.id ? 'findOne' : 'find'
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
