var Handlebars = require('handlebars');

require('arsl/templates.js');
Handlebars.partials = Handlebars.templates;

exports.mimeTypes = ['text/html'];

exports.format = function(mimeType, data, writable) {
	var string = Handlebars.templates.htmlDoc(data);
	writable.write(string);
};
