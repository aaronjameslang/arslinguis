var Q = require('q')
var liburl = require('url')
const React = require('react')
const renderToString = require('react-dom/server').renderToString

var authenticate = require('./authenticate.js')
var repository = require('./repository')
var authorise = require('./authorise')
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
      const methodName = criteria.id ? 'retrieveOne' : 'retrieveMany'
      return repository[methodName](criteria)
    })
    .then(function (data) {
      switch (request.accepts('html', 'json')) {
        case 'html':
          response.setHeader('content-type', 'text/html')
          const html = '<html/>' // rectify app data
          const markup = '' // renderToString(<app {data}/>)
          response.render('common.ejs', {markup})
          break
        case 'json':
          response.setHeader('content-type', 'application/json')
          var json = JSON.stringify(data)
          response.write(json)
          break
        default: throw new Error() // TODO 406
      }
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
