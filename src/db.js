var Q = require('q');
var mongodb = require('mongodb');

var deferred = Q.defer();

module.exports = function() {
	return deferred.promise;
};

var db = {};

db.mongoify = function(criteria) {
	if (!criteria || !criteria.id) {
		return;
	}
	criteria._id = criteria.id;
	delete criteria.id;
	//return criteria;
};

db.demongoify = function(document) {
	if (document === null) {
		return;
	}
	document.id = document._id;
	delete document._id;
	//return document;
};

db.findOne = function() {
	var deferred = Q.defer();
	this.mongoify(arguments[0]);
	function callback(error, document) {
		if (error) {
			deferred.reject(error);
			return;
		}
		this.demongoify(document);
		deferred.resolve(document);
	}
	Array.prototype.push.call(arguments, callback.bind(this));
	this.collection.findOne.apply(this.collection, arguments);
	return deferred.promise;
};

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
		db.collection = collection;
		deferred.resolve(db);
	});
});

