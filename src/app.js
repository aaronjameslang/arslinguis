var fs = require('fs');
var http = require('http');

var authenticate = require('arsl/src/authenticate.js');
var config = require('arsl/config.js');
var errors = require('arsl/src/errors.js');

process.title = 'arslinguis';

fs.writeFileSync(config.pidFile || 'pid', process.pid);

var server = http.createServer(function(request, response) {
	authenticate(request)
	.then(function(session) {
		// stuff
		response.end();
		
	})
	.catch(function(error) {
		return errors.logToResponse(error)
			.thenReject(error);
	})
	.catch(function(error) {
		return errors.logToDatabase(error);
	})
	.catch(function(error) {
		return errors.logToWritable(errori, process.stderr);
	});
});
server.listen(config.bindTo);

