var chai = require('chai');
chai.use(require('chai-properties'));
var expect = chai.expect;
var http = require('http');

var fixtures = require('./httpFixtures.js');

describe('Http Responses', function() {
  fixtures.forEach(function(fixture) {
    fixture.request.port = 8888;
    testFixture(fixture);
  });
});

function readWholeStream(readable, callback) {
  var string = '';
  readable.on('data', function(data) {
    string += data.toString();
  });
  readable.on('error', callback);
  readable.on('end', function() {
    callback(null, string);
  });
}

function testFixture(fixture) {
  it('should correctly respond to ' + fixture.request.path, function(done) {
    var testResponse_ = testResponse.bind(null, done, fixture);
    var request = http.request(fixture.request, testResponse_);
    request.on('error', done);
    request.end();
  });
}

function testResponse(done, fixture, response) {
  for (var key in fixture.response) {
    if (key === '_body') continue;
    var expectedValue = fixture.response[key];
    var actualValue = response[key];
    var message = 'Unexpected response ' + key;
    if (typeof expectedValue === 'object') {
      expect(actualValue).to.be.an('object', message);
      expect(actualValue).to.have.properties(expectedValue, message);
    } else {
      expect(actualValue).to.equal(expectedValue, message);
    }
  }
  var testBody = fixture.response._body;
  if (!testBody) {
    done();
    return;
  }
  if (!(testBody instanceof Function)) {
    var expectedBody = testBody;
    testBody = function(actualBody, chai) {
      chai.expect(actualBody).to.equal(expectedBody);
    };
  }
  readWholeStream(response, function(error, actualBody) {
    if (error) {
      done(error);
      return;
    }
    testBody(actualBody, chai);
    done();
  });
}
