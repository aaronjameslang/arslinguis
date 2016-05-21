var http = require('http')
var deepmerge = require('deepmerge')

module.exports = dispatch

var REQUEST_DEFAULTS = {
  method: 'GET',
  host: 'localhost',
  port: 8888,
  path: '/'
}

var EXPECTED_RESPONSE_DEFAULTS = {
  statusCode: 200
}

function dispatch (done, request, expectedResponse) {
  request = deepmerge(REQUEST_DEFAULTS, request)
  expectedResponse = deepmerge(EXPECTED_RESPONSE_DEFAULTS, expectedResponse)
  var testResponse_ = testResponse.bind(null, done, expectedResponse)
  http.request(request, testResponse_)
    .on('error', done)
    .end()
}

function testResponse (done, expectedResponse, response) {
  for (var key in expectedResponse) {
    if (key === '_body') {
      continue
    }
    var expectedValue = expectedResponse[key]
    var actualValue = response[key]
    var message = 'Unexpected response ' + key
    if (typeof expectedValue === 'object') {
      expect(actualValue).to.be.an('object', message)
      expect(actualValue).to.have.properties(expectedValue, message)
    } else {
      expect(actualValue).to.equal(expectedValue, message)
    }
  }

  var testBody = expectedResponse._body
  if (undefined === testBody) {
    done()
    return
  }

  if (!(testBody instanceof Function)) {
    var expectedBody = testBody
    testBody = function (actualBody, chai) {
      expect(actualBody).to.equal(expectedBody)
    }
  }

  readWholeStream(response, function (error, actualBody) {
    if (error) {
      done(error)
      return
    }
    testBody(actualBody, chai)
    done()
  })
}

function readWholeStream (readable, callback) {
  var string = ''
  readable.on('data', function (data) {
    string += data.toString()
  })
  readable.on('error', callback)
  readable.on('end', function () {
    callback(null, string)
  })
}
