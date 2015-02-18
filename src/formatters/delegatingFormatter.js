var _ = require('underscore');

exports.findFormatter = function(mimeType) {
	return _.find(this.formatter, function(formatter) {
		return formatter.canFormat(mimeType);
	});
};

exports.canFormat = function(mimeType) {
	return findFormatter(mimeType);
};

exports.format = function(mimeType, data) {
	return this.findFormatter(mimeType).mimeType(mimeType, data);
};

exports.formatters = [require('./jsonFormatter.js')];
