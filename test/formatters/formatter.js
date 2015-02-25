var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var shell = require('shelljs');

var analyseRequest = require('../../src/analyseRequest.js');
var getDb = require('../../src/db.js');

var formatter = require('../../src/formatters/delegatingFormatter.js');

var mimeTypes = {
	'json': 'application/json',
	'ld.json': 'application/ld+json',
	'hal.json': 'application/hal+json',
	'xml': 'application/xml',
	'html': 'text/html',
	'fragment.html': 'text/html;fragment',
	'editform.fragment.html': 'text/html;editform;fragment'
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
	fixture.filePath = filePath;
	fixture.dirPath = path.dirname(filePath);
	fixture.fileName = path.basename(filePath);
	fixture.fileText = fs.readFileSync(filePath, {encoding: 'utf8'});
	fixture.fileType = fixture.fileName.split('.').slice(1).join('.');
	fixture.mimeType = mimeTypes[fixture.fileType];
	fixture.url = '/' + path.relative(fixtureDir, fixture.dirPath);
	//fixture.url.length = fixture.url.length - (fixture.fileType.length + 1);
	fixture.url += '/' + fixture.fileName.split('.')[0];
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
	it('should correctly format ' + fixture.url, function() {
		return getDb().then(function(db) {
			var criteria = analyseRequest({url:fixture.url}).criteria;
			return db.findOne(criteria);
		}).then(function(document) {
			expect(document).to.be.an('object');
			var actualOutput = formatter.format(fixture.mimeType, document);
			var expectedOutput = fixture.fileText;
			expect(actualOutput).to.be.a('string').and.not.to.equal('');
			expect(expectedOutput).to.be.a('string').and.not.to.equal('');
			expect(actualOutput).to.equal(expectedOutput);
		});
	});
}

describe('Formatters', function() {
	fixtures.forEach(testFixture);
});
