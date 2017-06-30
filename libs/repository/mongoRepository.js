/**
 * This module wraps the mongo connection into a set of db-agnostic functions which return promises
 *
 * Objects coming in must have a type, and id where available
 */

const Q = require('q')
const getCollection = require('./getMongoCollection')

module.exports = {
  create: create,
  retrieveOne: retrieveOne,
  retrieveMany: retrieveMany,
  update: update,
  remove: remove
}

function create (object) {
  object = mongoify(object)
  return getCollection()
    .then(function (collection) {
      return Q.npost(collection, 'insert', [object])
    })
    .then(x => {
      // Can't find docs for this callback
      // assert x.insertedCount === 1
      // assert array length == 1 ?
      return x.insertedIds[0]
    })
}

function retrieveOne (criteria) {
  criteria = mongoify(criteria) // this may not need cloning
  return getCollection()
    .then(function (collection) {
      return Q.npost(collection, 'findOne', [criteria])
    })
    .then(demongoify)
}

function retrieveMany (criteria) {
  criteria = mongoify(criteria)
  return getCollection()
     .then(function (collection) {
       return Q.npost(collection, 'find', [criteria])
     })
     .then(function (cursor) {
       return Q.npost(cursor, 'toArray')
     })
     .then(demongoify)
}

function update () {
  throw new Error()
}

function remove () {
  throw new Error()
}

/**
 * Shift `id` to `_id` for objects going into the database
 * Clone first to prevent mutating input objects
 * @param object
 */
function mongoify (object) {
  // if (Array.isArray(object)) {
  //   return object.map(this.mongoify.bind(this))
  // }

  if (!object.id) return object
  const clone_ = clone(object)
  clone_._id = object.id
  delete clone_.id
  return clone_
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

  if (!object) return object

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
