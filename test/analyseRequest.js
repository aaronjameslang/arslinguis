var chai = require('chai');
var should = chai.should();
chai.use(require('chai-properties'));

var analyseRequest = require('../src/analyseRequest.js');
var fixtures = require('./analyseRequest.fixtures.js');

describe('analyseRequest', function() {
	fixtures.forEach(function(fixture, fixtureIndex) {
		it('should correctly analyse fixture #' + fixtureIndex, function() {
			var actualOutput = analyseRequest(fixture.input);
			actualOutput.should.have.properties(fixture.output);
		});
	});
});
