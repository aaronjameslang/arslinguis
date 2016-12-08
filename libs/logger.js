var _ = require('lodash')
var pmongo = require('promised-mongo')
var Q = require('q')

var db = pmongo('mongodb://127.0.0.1/arslinguis')
var fs = require('fs')
var errors = require('./errors.js')
var ArslinguisError = errors.ArslinguisError

exports.logError = logError
exports.logRequest = logRequest
exports.logString = logString
exports.respondWithError = respondWithError

function logError (error) {
  logString(error + '\n' + error.stack)

  var dbCollection = db.collection('errorLogs')
  var document = _.pick('name', 'message', 'stack', 'code')
  return dbCollection.insert(document)
}

function logRequest (request) {
  logString(request.method + request.url)
}

function respondWithError (error, response) {
  response.statusCode = 500
  if (error instanceof ArslinguisError && error.code) {
    response.statusCode = error.code
    response.statusMessage = error.message
  }
  response.write(response.statusCode + ': ' + response.statusMessage)
  return Q.ninvoke(response, 'end')
}

function logString (message) {
  message = new Date() + ' ' + message + '\n'
  fs.appendFile('app.log', message, function (error) {
    if (error) {
      console.log('Error when logging: ', error)
    }
  })
}
