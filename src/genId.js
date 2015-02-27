var uuid = require('node-uuid');

module.exports = function () {
	return uuid.v4({}, new Buffer(16)) // Generate uuid, return buffer
		.toString('base64') // Format bytes to base64
		.split('+').join('-') // Make base64 url-safe
		.split('/').join('_') // Split/join is faster, simpler than replace/g
		.substr(0, 22); // Trim padding, optional as length is known
};
