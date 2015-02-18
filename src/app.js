var config = require('../config.js');
var http = require('http');

var server = http.createServer(function(request, response) {
	response.end();
});
server.listen(config.bindTo);

