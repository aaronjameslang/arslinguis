var _ = require('underscore');

exports.mimeTypes = ['application/json'];

exports.canFormat = function(mimeType) {
	return _.contains(this.mimeTypes, mimeType);
};

exports.format = function(mimeType, data) {
	return JSON.stringify(data) + "\n";
};
