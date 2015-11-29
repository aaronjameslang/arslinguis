#! /usr/bin/env node

var fs = require('fs');
var http = require('http');

var config = require('./config.js');
var handleRequest = require('./libs/handleRequest.js');

process.title = 'arslinguis';

fs.writeFileSync(config.pidFile || 'pid', process.pid);

var server = http.createServer(handleRequest);
server.listen(config.bindTo);

console.log('Bound to ' + config.bindTo);
