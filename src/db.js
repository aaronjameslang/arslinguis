var Q = require('q');
var mongodb = require('mongodb');

var db = exports;
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

db.unwrap = function() {
	return deferred.promise;
};

db.mongoify = function(criteria) {
	if (!criteria || !criteria.id) {
		return;
	}
	criteria._id = criteria.id;
	delete criteria.id;
};

db.demongoify = function(document) {
	if (document === null) {
		return;
	}
	document.id = document._id;
	delete document._id;
};

db.findOne = function() {
	var args = arguments;
	this.mongoify(args[0]);
	return this.unwrap()
	.then(function(collection) {
		return Q.npost(collection, 'findOne', args);
	})
	.then(function(document) {
		this.demongoify(document);
		return document;
	}.bind(this));
};
