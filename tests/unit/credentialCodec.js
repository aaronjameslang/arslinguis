var chai = require('chai');
var expect = chai.expect;

var credentialCodec = require('../../libs/credentialCodec.js');

var fixtures = {
	"username:password" : {
		username: 'username',
		password: 'password'
	},
	"/username:password" : {
		username: 'username',
		password: 'password'
	},
	"domain/username:password" : {
		domain: 'domain',
		username: 'username',
		password: 'password'
	},
	"fish&chips:rock!!!": {
		username: 'fish&chips',
		password: 'rock!!!'
	},
	"d%3A%2F%3F/dave%3F!%2F%3B%3A%2F://::123": {
		domain: 'd:/?',
		username: 'dave?!/;:/',
		password: '//::123'
	}
};

function testDecode(b64, credential) {
	var actualCredential = credentialCodec.decode(b64);
	expect(actualCredential).to.have.properties(credential);
}

function testEncode(b64, credential) {
	var actualB64 = credentialCodec.encode(credential);
	expect(actualB64).to.equal(b64);
}

describe('credentialCodec', function() {
	for (var plain in fixtures) {
		var b64 = new Buffer(plain).toString('base64');
		var credential = fixtures[plain];
		it('should be able to encode ' + plain, function() {
			var actualB64 = credentialCodec.encode(credential);
			expect(actualB64).to.equal(b64);
		});
		it('should be able to decode ' + plain, testDecode.bind(null, b64, credential));
		//it('should be able to encode ' + plain, testEncode.bind(null, b64, credential));
	}
});