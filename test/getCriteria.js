var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-properties'));

var getCriteria = require('../libs/getCriteria.js');
expect(getCriteria).to.be.a('function');
var fixtures = require('./getCriteria.fixtures.js');

function testFixture(fixture) {
	it('should correctly parse ' + fixture.input.url, function() {
		var actualOutput = getCriteria(fixture.input.url);
		actualOutput.should.have.properties(fixture.output.criteria);
	});
}

describe('getCriteria', function() {
	fixtures.forEach(testFixture);
});
