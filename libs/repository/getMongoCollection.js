/**
 * This module handles connecting to mongo
 */

const Q = require('q')

module.exports = getCollection
module.exports.private = {
  connect: connect
}

const deferredCollections = []

/**
 * @return {{}} mongodb collection promise
 */
function getCollection (collectionName) {
  collectionName = collectionName || 'main'
  if (!deferredCollections[collectionName]) {
    const deferredCollection = Q.defer()
    deferredCollections[collectionName] = deferredCollection
    const mongodb = require('mongodb')
    connect(collectionName, mongodb, deferredCollection)
  }
  return deferredCollections[collectionName].promise
}

function connect (collectionName, mongodb, deferredCollection) {
  const url = 'mongodb://127.0.0.1/arslinguis'
  mongodb.MongoClient.connect(url, (error, database) => {
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
