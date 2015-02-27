var chai = require('chai');
var expect = chai.expect;
var http = require('http');

var authenticate = require('arsl/src/authenticate.js');

var passwords = {
	"christophe.grandsire-koevoets":
		"3kPTRbVWFtoCHqAsiJoVsTyCwmwg7wAN.christophe.grandsire-koevoets",
	"david.peterson":
		"TRNawvy97skk4hxishETr4NybTTMEdRJ.david.peterson",
	"george.corley":
		"vvhtaXqo4TcFVXtwaKtgchAWUHpprvYn.george.corley",
	"john.quijada":
		"bmrEk7cz7ipUhzmaVbM7TusPLxfziAqj.john.quijada",
	"matt.pearson":
		"EMCxvCpvkpVywxkfPqCdoKPmFg4PxWK9.matt.pearson",
	"sai":
		"imKMpL49M4YLfuuKabuibeFTdoJXjEyx.sai",
	"samantha.harrison":
		"nPUM9PMMrbszJJTHmnaLncKVjhFKqVnu.samantha.harrison",
	"william.annis":
		"oA7EnpstRPqgqgWnLuVePj7RY7Ax3tAk.william.annis"
};

function Request() {}
function Response() {}
Response.prototype.end = function() {
	error = this.statusCode + ': ' + this.stausMessage;
};

var error;

describe('authenticate', function() {
	var sessionId;
	it('should be able to log in as Sam', function() {
		var request = new Request();
		var response = new Response();
		var name = 'samantha.harrison';
		var buffer = new Buffer(name + ':' + passwords[name]);
		var authorization = 'Basic ' + buffer.toString('base64');
		request.headers = {authorization: authorization};
		return authenticate(request, response)
		.then(function() {
			expect(error).not.to.exist;
			var session = request.session;
			expect(session).to.be.an('object');
			expect(session.type).to.equal('session');
			expect(session.userId).to.equal('0Lwcs4fCTZyd3moCtA4evg');
			expect(session.id).to.be.a('string');
			expect(session.id).to.have.length(22);
			sessionId = session.id;
		});
	});
	it('should stay logged in as Sam', function() {
		var request = new Request();
		var response = new Response();
		request.headers = {cookie: 'arslinguis-session-id='+sessionId};
		return authenticate(request, response)
		.then(function() {
			expect(error).not.to.exist;
			var session = request.session;
			expect(session).to.be.an('object');
			expect(session.type).to.equal('session');
			expect(session.userId).to.equal('0Lwcs4fCTZyd3moCtA4evg');
			expect(session.id).to.equal(sessionId);
		});
	});
});
