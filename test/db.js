var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var getDb;

describe('Database', function() {
	it('should initialise without errors', function() {
		getDb = require('../src/db.js');
		expect(getDb()).to.be.an('object');
		expect(getDb().then).to.be.a('function');
	});
	it('should connect succesfully', function() {
		return getDb().then(function(db) {
			expect(db).to.be.an('object');
			expect(db.collection).to.be.an('object');
			expect(db.findOne).to.be.a('function');
		});
	});
	it('should respond with a document', function() {
		return getDb().then(function(db) {
			return db.findOne({});
		}).then(function(document) {
			expect(document).to.be.an('object');
			expect(document.type).to.be.a('string');
		});
	});
});
