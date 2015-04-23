var Handlebars = require('handlebars');

require('arsl/src/templates.js');

exports.mimeTypes = ['text/html'];

exports.format = function(mimeType, data, writable) {
	var string = Handlebars.templates.htmlDoc(data);
	writable.write(string);
};
