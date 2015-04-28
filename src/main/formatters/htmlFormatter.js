var Handlebars = require('handlebars');

require('arsl/templates.js');

exports.mimeTypes = ['text/html'];

exports.format = function(mimeType, data, writable) {
	var string = Handlebars.templates.htmlDoc(data);
	writable.write(string);
};
