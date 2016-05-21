#! /usr/bin/env node

var app = require('express')()
var cookieParser = require('cookie-parser')
var fs = require('fs')

var config = require('./config.js')
var handleRequest = require('./libs/handleRequest.js')
var logger = require('./libs/logger')

process.title = 'arslinguis'

fs.writeFileSync(config.pidFile || 'pid', process.pid)

app.use(cookieParser())
app.use(handleRequest)
app.listen(config.bindTo)

logger.logString('Bound to ' + config.bindTo)
