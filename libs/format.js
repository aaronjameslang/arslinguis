var _ = require('underscore');
var Negotiator = require('negotiator');

var errors = require('./errors.js');
var ContentNegotiationError = errors.ContentNegotiationError;

var formats = {
  'text/html': formatHtml,
  'application/json': formatJson,
  'application/xml': formatXml,
};

var mimeTypes = Object.keys(formats);

module.exports = function(request, response, data) {
  var mimeType = new Negotiator(request).mediaType(mimeTypes) ||
    mimeTypes[0];
  response.setHeader('content-type', mimeType);
  var format = formats[mimeType];
  format(request, response, data);
};

function formatHtml(request, response, data) {
  var Handlebars = require('handlebars');
  require('../target/templates.js');
  require('./templates/helpers.js');
  Handlebars.partials = Handlebars.templates;

  var string = Handlebars.templates.htmlDoc(data);
  response.write(string);
}

function formatJson(request, response, data) {
  var json = JSON.stringify(data);
  response.write(json);
}

function formatXml(request, response, data) {
  var json = JSON.stringify(data);
  response.write(json);
}
