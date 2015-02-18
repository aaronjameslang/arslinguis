var Q = require('q');
var mongodb = require('mongodb');

var deferred = Q.defer();

var url = 'mongodb://localhost/arslinguis';
mongodb.MongoClient.connect(url, function(error, database) {
	if (error) {
		deferred.reject(error);
		return;
	}
	database.collection('main', function(error, collection) {
		if (error) {
			deferred.reject(error);
			return;
		}
		deferred.resolve(collection);
	});
});

module.exports = exports = deferred.promise;
