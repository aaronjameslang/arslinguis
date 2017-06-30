var _ = require('lodash')
const Q = require('q')

const getCollection = require('./repository/getMongoCollection')
var fs = require('fs')
var errors = require('./errors.js')
var ArslinguisError = errors.ArslinguisError

exports.logError = logError
exports.logRequest = logRequest
exports.logString = logString
exports.respondWithError = respondWithError

function logError (error) {
  logString(error + '\n' + error.stack)

  const errorDoc = _.pick(error, 'name', 'message', 'stack', 'code')
  return getCollection('errorLogs')
  .then(collection => Q.npost(collection, 'insert', [errorDoc]))
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
