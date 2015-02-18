var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var formatterNames = ['jsonFormatter', 'htmlFragmentFormatter'];
var formatterDirectory = '../../src/formatters/';
var allFixtures = [];
var allMimeTypes = [];

function itShouldBeAbleToFormat(mimeType, formatter) {
	it('should be able to format ' + mimeType, function() {
		var canFormat = formatter.canFormat(mimeType);
		canFormat.should.be.true;
		allMimeTypes.push(mimeType);
	});
}

function itShouldCorrectlyFormat(fixture, fixtureIndex, formatter) {
	it('should correctly format fixture #' + fixtureIndex, function() {
		var actualOutput = formatter.format(fixture.mimeType, fixture.input);
		actualOutput.should.equal(fixture.output);
		allFixtures.push(fixture);
	});
}

function describeFormatter(formatterName) {
	describe(formatterName, function() {
		var formatter;
		try {
			formatter = require(formatterDirectory + formatterName + '.js');
		} catch(e) {
			formatter = null;
		}
		it('should exist', function() {
			expect(formatter).to.exist;
		});

		var fixtures;
		try {
			fixtures = require('./' + formatterName + '.fixtures.js');
		} catch(e) {
			fixtures = null;
		}
		it('should have test fixtures', function() {
			expect(fixtures).to.exist;
		});

		if (!formatter || !fixtures) {
			return;
		}

		fixtures.mimeTypes.forEach(function(mimeType) {
			itShouldBeAbleToFormat(mimeType, formatter);
		});

		fixtures.forEach(function(fixture, fixtureIndex) {
			itShouldCorrectlyFormat(fixture, fixtureIndex, formatter);
		});
	});
}

function describeDelegatingFormatter() {
	describe('delegatingFormatter', function() {
		var formatter;
		it('should exist', function() {
			formatter = require(formatterDirectory + 'delegatingFormatter.js');
			should.exist(formatter);
		});
		allMimeTypes.forEach(function(mimeType) {
			itShouldBeAbleToFormat(mimeType, formatter);
		});
		allFixtures.forEach(function(fixture, fixtureIndex) {
			itShouldCorrectlyFormat(fixture, fixtureIndex, formatter);
		});
	});
}

describe('Formatters:', function() {
	formatterNames.forEach(describeFormatter);
	describeDelegatingFormatter();
});

