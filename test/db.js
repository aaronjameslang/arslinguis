var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

var db;

describe('Database', function() {
	it('should initialise without errors', function() {
		db = require('../src/db.js');
	});
	it('should connect succesfully', function() {
		return expect(db).to.eventually.exist;
	});
	it('should respond with a document', function(done) {
		db.then(function(collection) {
			expect(collection).to.exist;
			expect(collection.findOne).to.be.a.function;
			collection.findOne({}, function(error, document) {
				expect(error).not.to.exist;
				expect(document).to.be.an.object;
				expect(document.type).to.be.a.string;
				done();
			});
		});
	});
});
