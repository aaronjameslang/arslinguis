var _ = require('underscore');

var formatters = [
	require('arsl/src/formatters/jsonFormatter.js')
];

function findFormatter(mimeType) {
	return _.find(formatters, function(formatter) {
		return formatter.canFormat(mimeType);
	});
};

exports.canFormat = function(mimeType) {
	return !!this.findFormatter(mimeType);
};

exports.format = function(mimeType, data) {
	return this.findFormatter(mimeType).format(mimeType, data);
};

