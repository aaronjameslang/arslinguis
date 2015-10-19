var _ = require('underscore');
var should = require('chai').should();

var libstr = require('../../libs/libstr.js');
var fixtures = require('./libstr.fixtures.js');

describe('libstr', function() {
  _.each(fixtures, function(plural, singular) {
    it('should know "' + plural + '" is plural', function() {
      libstr.isPlural(plural).should.equal(true);
    });
    it('should know "' + singular + '" is singular', function() {
      libstr.isPlural(singular).should.equal(false);
    });
    it(
      'should know the singular of "' + plural +
      '" is "' + singular + '"',
      function() {
        libstr.toSingular(plural).should.equal(singular);
      }
    );
    it(
      'should know the plural of "' + singular +
      '" is "' + plural + '"',
      function() {
        libstr.toPlural(singular).should.equal(plural);
      }
    );
  });
});
