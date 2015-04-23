exports.mimeTypes = ['application/json'];

exports.format = function(mimeType, data, writable) {
	var json = JSON.stringify(data);
	writable.write(JSON.stringify(data));
};
