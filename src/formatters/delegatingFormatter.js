var _ = require('underscore');

exports.findFormatter = function(mimeType) {
	return _.find(this.formatters, function(formatter) {
		return formatter.canFormat(mimeType);
	});
};

exports.canFormat = function(mimeType) {
	return this.findFormatter(mimeType);
};

exports.format = function(mimeType, data) {
	return this.findFormatter(mimeType).format(mimeType, data);
};

exports.formatters = [require('./jsonFormatter.js')];
