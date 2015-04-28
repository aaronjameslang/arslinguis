var chai = require('chai');
var expect = chai.expect;

var genId = require('arsl/genId.js');

var ids = [];

function testId(id) {
	describe('id: ' + id, function() {
		it('should be 22 chars long', function() {
			expect(id).to.have.length(22);
		});
		it('should should be unique', function() {
			var index = ids.indexOf(id);
			expect(index).to.equal(-1);
			ids.push(id);
		});
		it('should be url safe', function() {
			expect(id).to.equal(encodeURIComponent(id));
		});
	});
}

describe('genId', function() {
	for (var index = 0 ; index < 16 ; index += 1) {
		var id = genId();
		testId(id);
	}
});
