const generateId = require('node-uuid').v4
const mongoRepository = require('./repository/mongoRepository')
module.exports = {
  create: create,
  retrieveOne: mongoRepository.retrieveOne,
  retrieveMany: mongoRepository.retrieveMany,
  update: mongoRepository.update,
  remove: mongoRepository.remove
}

function create (object) {
  if (object.id) throw new Error()
  object.id = generateId()
  return mongoRepository.create(object)
}
