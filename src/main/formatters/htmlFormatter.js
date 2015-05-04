var Handlebars = require('handlebars');

require('arsl/templates.js');
require('arsl/templateHelpers.js');
Handlebars.partials = Handlebars.templates;

exports.mimeTypes = ['text/html'];

exports.format = function(mimeType, data, writable) {
	var string = Handlebars.templates.htmlDoc(data);
	writable.write(string);
};
