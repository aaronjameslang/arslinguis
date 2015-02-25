var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var shell = require('shelljs');

var analyseRequest = require('../../src/analyseRequest.js');
var db = require('../../src/db.js');
var formatter = require('../../src/formatters/delegatingFormatter.js');

var mimeTypes = {
	'json': 'application/json'
};

var fileTypes = {
	'application/json': 'json',
	'application/ld+json': 'ld.json',
	'application/hal+json': 'hal.json',
	'application/xml': 'xml',
	'text/html': 'html',
	'text/html;fragment': 'fragment.html',
	'text/html;editform;fragment': 'editform.fragment.html',
	'text/html;fragment;editform': 'editform.fragment.html'
};

var fixtureDir = './test/expected-responses/';
var filePaths = shell.ls('-R', fixtureDir);

function isFile(filePath) {
	var stat = fs.statSync(filePath);
	return !stat.isDirectory();
}

function buildFixture(filePath) {
	var fixture = {};
	fixture.fileName = path.basename(filePath);
	fixture.fileText = fs.readFileSync(filePath);
	fixture.fileType = path.basename(filePath).split('.').slice(1).join('.');
	fixture.mimeType = mimeTypes[fixture.fileType];
	fixture.url = '/' + path.relative(fixtureDir, filePath);
	return fixture;
}

var fixtures = filePaths.map(function(fileName) {
	return path.resolve(fixtureDir, fileName);
}).filter(isFile).map(buildFixture);


function testFixture(fixture, fixtureIndex) {
	var canFormat;
	it('should be able to format ' + (fixture.mimeType||fixture.fileType), function() {
		canFormat = formatter.canFormat(fixture.mimeType);
		expect(canFormat).to.be.true;
	});
	it('should correctly format ' + fixture.url, canFormat && function() {
		return db.then(function(collection) {
			var criteria = analyseRequest({url:fixture.url}).criteria;
			collection.findOne(criteria, function(error, document) {
				if (error) {
					done(error);
				}
				var actualOutput = formatter.format(fixture.mimeType, document);
				var expectedOutput = fixture.fileText;
				expect(expectedOutput).to.equal(actualOutput);
			});
		});
	});
}

describe('Formatters', function() {
	fixtures.forEach(testFixture);
});
