/**
 * This module handles connecting to mongo
 */

module.exports = getCollection
module.exports.private = {
  connect: connect
}

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
