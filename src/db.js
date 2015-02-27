var Q = require('q');
var mongodb = require('mongodb');

var db = exports;
var deferred = Q.defer();
var url = 'mongodb://127.0.0.1/arslinguis';

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

db.clone = function(object) {
	var clone = {};
	for (var key in object) {
		clone[key] = object[key];
	}
	return clone;
};

db.mongoify = function(object) {
	if (Array.isArray(object)) {
		return object.map(this.mongoify.bind(this));
	}
	if (!object || !object.id) {
		return object;
	}

	var clone = this.clone(object);
	clone._id = object.id;
	delete clone.id;
	return clone;
};

db.demongoify = function(object) {
	if (!object) {
		return object;
	}
	if (Array.isArray(object)) {
		return object.map(this.demongoify.bind(this));
	}

	object.id = object._id;
	delete object._id;
	return object;
};

db.findOne = function() {
	var args = arguments;
	args[0] = this.mongoify(args[0]);
	return this.unwrap()
	.then(function(collection) {
		return Q.npost(collection, 'findOne', args);
	})
	.then(function(document) {
		return this.demongoify(document);
	}.bind(this));
};

db.insert = function() {
	var args = arguments;
	args[0] = this.mongoify(args[0]);
	return this.unwrap()
	.then(function(collection) {
		return Q.npost(collection, 'insert', args);
	});
};
