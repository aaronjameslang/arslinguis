const Q = require('q')

module.exports = {
  create: create,
  retrieve: retrieve,
  update: update
  // delete: delete,
}

db.clone = function (object) {
  var clone = {}
  for (var key in object) {
    clone[key] = object[key]
  }
  return clone
}

function mongoify(object) {
  if (Array.isArray(object)) {
    return object.map(this.mongoify.bind(this))
  }
  if (!object || !object.id) {
    return object
  }

  var clone = this.clone(object)
  clone._id = object.id
  delete clone.id
  return clone
}

function demongoify (object) {
  if (!object) {
    return object
  }
  if (Array.isArray(object)) {
    return object.map(this.demongoify.bind(this))
  }

  object.id = object._id
  delete object._id
  return object
}

db.findOne = function () {
  var args = arguments
  args[0] = this.mongoify(args[0])
  return this.unwrap()
    .then(function (collection) {
      return Q.npost(collection, 'findOne', args)
    })
    .then(function (document) {
      return this.demongoify(document)
    }.bind(this))
}

db.find = function () {
  var args = arguments
  args[0] = this.mongoify(args[0])
  return this.unwrap()
    .then(function (collection) {
      return Q.npost(collection, 'find', args)
    })
    .then(function (cursor) {
      return Q.npost(cursor, 'toArray')
    })
    .then(function (documents) {
      return this.demongoify(documents)
    }.bind(this))
}

db.insert = function () {
  var args = arguments
  args[0] = this.mongoify(args[0])
  return this.unwrap()
    .then(function (collection) {
      return Q.npost(collection, 'insert', args)
    })
}

// # Connection handing #

let deferredCollection = null

/**
 * @return {{}} mongodb collection promise
 */
function getCollection() {
  if (!deferredCollection) {
    deferredCollection = Q.defer()
    const mongodb = require('mongodb')
    connect(mongodb, deferredCollection)
  }
  return deferredCollection.promise
}

function connect(mongodb, deferredCollection) {
  const url = 'mongodb://127.0.0.1/arslinguis'
  const collectionName = 'main'
  return mongodb.MongoClient.connect(url, (error, database) => {
    if (error) {
      deferredCollection.reject(error)
      return
    }
    database.collection(collectionName, (error, collection) => {
      if (error) {
        deferredCollection.reject(error)
        return
      }
      deferredCollection.resolve(collection)
    })
  })
}
