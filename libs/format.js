var _ = require('underscore');
var Negotiator = require('negotiator');

var errors = require('./errors.js');
var ContentNegotiationError = errors.ContentNegotiationError;

var formats = {
  'text/html': format_html,
  'application/json': format_json,
  'application/xml': format_xml
};

var mimeTypes = Object.keys(formats);

module.exports = function(request, response, data) {
  var mimeType = new Negotiator(request).mediaType(mimeTypes) ||
    mimeTypes[0];
  response.setHeader('content-type', mimeType);
  var format = formats[mimeType];
  format(request, response, data);
};

function format_html(request, response, data) {
  var Handlebars = require('handlebars');
  require('../target/templates.js');
  require('./templates/helpers.js');
  Handlebars.partials = Handlebars.templates;

  var string = Handlebars.templates.htmlDoc(data);
  response.write(string);
}

function format_json(request, response, data) {
  var json = JSON.stringify(data);
  response.write(json);
}

function format_xml(request, response, data) {
  var json = JSON.stringify(data);
  response.write(json);
}
