var _ = require('underscore');
var should = require('chai').should();

var libstr = require('arsl/src/libstr.js');
var fixtures = require('./libstr.fixtures.js');

describe('stringAspects', function() {
	_.each(fixtures, function(plural, singular) {
		it('should know "' + plural + '" is plural', function() {
			libstr.isPlural(plural).should.be.true;
		});
		it('should know "' + singular + '" is singular', function() {
			libstr.isPlural(singular).should.be.false;
		});
		it('should know the singular of "' + plural + '" is "' + singular + '"', function() {
			libstr.toSingular(plural).should.equal(singular);
		});
		it('should know the plural of "' + singular + '" is "' + plural + '"', function() {
			libstr.toPlural(singular).should.equal(plural);
		});
	});
});
