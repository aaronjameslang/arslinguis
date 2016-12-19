const db = require('../db.js')
const genId = require('node-uuid').v4

module.exports = {
  getCredential: getCredential,
  getSessionById: getSessionById,
  createSession: createSession
}

function getCredential (username, domain) {
  if (!username || typeof username !== 'string') {
    throw new Error()
  }
  const criteria = {
    type: 'credential',
    username: username
  }
  if (domain) {
    criteria.domain = domain
  }
  return db.findOne(criteria)
}

function getSessionById (sessionId) {
  return db.findOne({id: sessionId, type: 'session'})
}

function createSession (userId) {
  const session = {
    id: genId(),
    type: 'session',
    userId: userId,
    ctime: Date.now()
  }
  return db.insert(session)
    .then(() => session)
}
