exports.mimeTypes = ['application/json'];

exports.format = function(mimeType, data, writable) {
	var json = JSON.stringify(data);
	console.log('writing', json);
	writable.write(JSON.stringify(data));
	console.log('wrote');
};
