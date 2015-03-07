var _ = require('underscore');

var errors = require('arsl/src/errors.js');
var ContentNegotiationError = errors.ContentNegotiationError;

var formatters = [
	require('arsl/src/formatters/jsonFormatter.js')
];

var mimeTypes = _.chain(formatters)
	.pluck('mimeTypes')
	.flatten()
	.value();

function findFormatter(mimeType) {
	return _.find(formatters, function(formatter) {
		return formatter.canFormat(mimeType);
	});
}

exports.canFormat = function(mimeType) {
	return _.contains(mimeTypes, mimeType);
};

exports.format = function(mimeType, data) {
	return this.findFormatter(mimeType).format(mimeType, data);
};

exports.negotiateContent = function(request, response) {
	var mimeType = request.headers.accept;
	if (!this.canFormat(mimeType)) {
		throw new ContentNegotiationError(mimeType);
	}
	response.setHeader('content-type', mimeType);
};
