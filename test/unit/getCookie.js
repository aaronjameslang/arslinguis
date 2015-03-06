var chai = require('chai');
var expect = chai.expect;

var getCookie = require('arsl/src/getCookie.js');

var fixtures = {
	'a=b;c=d': {
		a: 'b',
		c: 'd'
	},
	'a=b;c=d;': {
		a: 'b',
		c: 'd'
	},
	'a=123;arslinguis-session-id=123abc/.+-_;b=??!': {
		a: '123',
		'arslinguis-session-id': '123abc/.+-_',
		b: '??!'
	},
	'semicolon=%3b;equals=%3D;empty1=;empty2': {
		semicolon: ';',
		equals: '=',
		empty1: '',
		empty2: ''
	},
	'arslinguis-session-id=pH-ADjC-Ti6wSSlYeaSa0w': {
		'arslinguis-session-id': 'pH-ADjC-Ti6wSSlYeaSa0w'
	}
};

describe('getCookie', function() {
	for (var string in fixtures) {
		var object = fixtures[string];
		testFixture(string, object);
	}
});

function testFixture(string, object) {
	var request = {headers:{cookie:string}};
	for (var key in object) {
		it('should find ' + key + ' in ' + string, function(key) {
			var expectedValue = object[key];
			var actualValue = getCookie(request, key);
			expect(actualValue).to.equal(expectedValue);
		}.bind(null, key));
	}
}