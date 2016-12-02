/**
 * This module wraps the mongo connection into a set of db-agnostic functions which return promises
 *
 * Objects coming in must have a type, and id where available
 */

const Q = require('q')
const getCollection = require('./getMongoCollection')

function create (object) {
  object = mongoify(object)
  return getCollection()
    .then(function (collection) {
      return Q.npost(collection, 'insert', [object])
    })
}

function retrieve (criteria) {
  criteria = mongoify(criteria) // this may not need cloning
  return getCollection()
    .then(function (collection) {
      return Q.npost(collection, 'findOne', [criteria])
    })
    .then(demongoify)
}

/**
 * Shift `id` to `_id` for objects going into the database
 * Clone first to prevent mutating input objects
 * @param object
 */
function mongoify(object) {
  // if (Array.isArray(object)) {
  //   return object.map(this.mongoify.bind(this))
  // }

  const clone = clone(object)
  clone._id = object.id
  delete clone.id
  return clone
}

/**
 * Shift `_id` to `id` for object coming out of the database
 * @param object
 * @return {*}
 */
function demongoify (object) {
  // if (Array.isArray(object)) {
  //   return object.map(this.demongoify.bind(this))
  // }

  object.id = object._id
  delete object._id
  return object
}

function clone (object) {
  const clone = {}
  for (const key in object) {
    clone[key] = object[key]
  }
  return clone
}

// db.findOne = function () {
//   var args = arguments
//   args[0] = this.mongoify(args[0])
//   return this.unwrap()
//     .then(function (collection) {
//       return Q.npost(collection, 'findOne', args)
//     })
//     .then(function (document) {
//       return this.demongoify(document)
//     }.bind(this))
// }
//
// db.find = function () {
//   var args = arguments
//   args[0] = this.mongoify(args[0])
//   return this.unwrap()
//     .then(function (collection) {
//       return Q.npost(collection, 'find', args)
//     })
//     .then(function (cursor) {
//       return Q.npost(cursor, 'toArray')
//     })
//     .then(function (documents) {
//       return this.demongoify(documents)
//     }.bind(this))
// }
