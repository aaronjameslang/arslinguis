var url = require('url');

module.exports = function analyseRequest(request) {
	var output = {};
	var parsedUrl = url.parse(request.url, true);
	var urlPathParts = parsedUrl.path.split('/');
	if (!urlPathParts[0]) {
		urlPathParts = urlPathParts.slice(1);
	}
	output.collection = (urlPathParts.length%2) === 1 ;
	var lastUrlPathPart = urlPathParts[urlPathParts.length-1];
	if (!output.collection) {
		output.criteria = {
			id: lastUrlPathPart
		};
	} else {
		output.criteria = {
			type: lastUrlPathPart.toSingular()
		};
		if (urlPathParts.length >= 3) {
			var secondLastUrlPathPart = urlPathParts[urlPathParts.length - 2];
			var thirdLastUrlPathPart = urlPathParts[urlPathParts.length - 3];
			var parentId = secondLastUrlPathPart;
			var parentType = thirdLastUrlPathPart.toSingular();
			output.criteria[parentType + 'Id'] = parentId;
		}
	}
	return output;
};
