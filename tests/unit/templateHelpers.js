var chai = require('chai');
var expect = chai.expect;
var Handlebars = require('handlebars');

require('../../libs/templates/helpers.js');

var fixtures = [{
  template: '{{name}}',
  data: {names: ['Abc']},
  expectedOutput: 'Abc',
}, {
  template: '{{description}}',
  data: {descriptions: ['Large']},
  expectedOutput: 'Large',
},];

function testFixture(fixture) {
  it('should format ' + fixture.template + ' into ' + fixture.expectedOutput, function() {
    var actualOutput = Handlebars.compile(fixture.template)(fixture.data);
    expect(actualOutput).to.equal(fixture.expectedOutput);
  });
}

describe('templateHelpers', function() {
  fixtures.forEach(function(fixture) {
    testFixture(fixture);
  });
});
