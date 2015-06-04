var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var db;

describe('Database', function() {
	it('should initialise without errors', function() {
		db = require('../libs/db.js');
		expect(db).to.be.an('object');
		expect(db.unwrap).to.be.a('function');
		expect(db.findOne).to.be.a('function');
		expect(db.insert).to.be.a('function');
	});
	it('should connect succesfully', function() {
		return db.unwrap().then(function(collection) {
			expect(collection).to.be.an('object');
		});
	});
	it('should respond with a document', function() {
		return db.findOne({}).then(function(document) {
			expect(document).to.be.an('object');
			expect(document.type).to.be.a('string');
		});
	});
	it('should respond with a user', function() {
		return db.findOne({type:'user'}).then(function(document) {
			expect(document).to.be.an('object');
			expect(document.type).to.equal('user');
		});
	});
	it('should respond with a language', function() {
		return db.findOne({type:'language'}).then(function(document) {
			expect(document).to.be.an('object');
			expect(document.type).to.equal('language');
		});
	});
});
