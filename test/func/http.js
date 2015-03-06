var chai = require('chai');
var should = chai.should();
chai.use(require('chai-http'));

var config = require('../config.js');

describe('Root url', function() {
	it('should respond status 200', function(done) {
		chai.request(config.url).get('/')
			.end(function(error, response) {
				should.not.exist(error);
				should.exist(response);
				response.should.have.status(200);
				done();
			});
	});
});
