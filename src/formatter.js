var _ = require('underscore');

var errors = require('arsl/src/errors.js');
var ContentNegotiationError = errors.ContentNegotiationError;

var formatters = [
	require('arsl/src/formatters/jsonFormatter.js'),
	require('arsl/src/formatters/htmlFormatter.js')
];

var mimeTypes = _.chain(formatters)
	.pluck('mimeTypes')
	.flatten()
	.value();

function findFormatter(mimeType) {
	return _.find(formatters, function(formatter) {
		return _.contains(formatter.mimeTypes, mimeType);
	});
}

exports.canFormat = function(mimeType) {
	return _.contains(mimeTypes, mimeType);
};

exports.format = function(data, writable, mimeType) {
	if (!mimeType) {
		mimeType = writable.getHeader('content-type');
	}
	findFormatter(mimeType).format(mimeType, data, writable);
};

exports.negotiateContent = function(request, response) {
	var mimeType = request.headers.accept;
	if (!this.canFormat(mimeType)) {
		throw new ContentNegotiationError(mimeType);
	}
	response.setHeader('content-type', mimeType);
};
