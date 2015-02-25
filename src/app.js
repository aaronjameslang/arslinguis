var fs = require('fs');
var http = require('http');

var config = require('../config.js');

process.title = 'arslinguis';

fs.writeFileSync(config.pidFile || 'pid', process.pid);

var server = http.createServer(function(request, response) {
	response.end();
});
server.listen(config.bindTo);

