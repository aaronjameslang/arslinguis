const AuthenticationError = require('../errors').AuthenticationError

const hash = (() => {
  const bcrypt = require('bcrypt')
  const Q = require('q')
  return Q.nbind(bcrypt.hash, bcrypt)
})()

module.exports = assertPasswordIsCorrect
module.exports._private = {
  assertPasswordIsCorrect: assertPasswordIsCorrect,
  verifyPassword: verifyPassword,
  hash: hash
}

/**
 * @param suppliedPassword
 * @param storedHashcode
 * @return {Promise.<boolean>}
 */
function verifyPassword (suppliedPassword, storedHashcode) {
  return hash(suppliedPassword, storedHashcode)
    .then(function (actualHashcode) {
      return (actualHashcode === storedHashcode)
    })
}

function assertPasswordIsCorrect (suppliedPassword, storedHashcode) {
  return verifyPassword(suppliedPassword, storedHashcode)
    .then(correct => {
      if (!correct) throw new AuthenticationError('Incorrect password')
    })
}
