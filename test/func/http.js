var chai = require('chai');
chai.use(require('chai-properties'));
var expect = chai.expect;
var fs = require('fs');
var http = require('http');

var fixturesFile = require.resolve('arsl/db/fixtures.mongoexport');
var lines = fs.readFileSync(fixturesFile, {'encoding':'utf8'}).split('\n');

describe('Http Responses', function() {
	lines.forEach(function(line) {
		if (!line) return;
		var fixture = JSON.parse(line);
		fixture.request.port = 8888;
		testFixture(fixture);
	});
});


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
	done();
}
