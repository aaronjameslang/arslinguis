var _ = require('underscore');
var should = require('chai').should();

require('../src/stringAspects.js');
var fixtures = require('./stringAspects.fixtures.js');

describe('stringAspects', function() {
	_.each(fixtures, function(plural, singular) {
		it('should know "' + plural + '" is plural', function() {
			plural.isPlural().should.be.true;
		});
		it('should know "' + singular + '" is singular', function() {
			singular.isPlural().should.be.false;
		});
		it('should know the singular of "' + plural + '" is "' + singular + '"', function() {
			plural.toSingular().should.equal(singular);
		});
		it('should know the plural of "' + singular + '" is "' + plural + '"', function() {
			singular.toPlural().should.equal(plural);
		});
	});
});
