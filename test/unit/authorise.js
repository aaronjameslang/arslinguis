const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-properties'))

const authorise = require('../../libs/authorise')

const AuthenticationError = require('../../libs/errors.js').AuthenticationError
const AuthorisationError = require('../../libs/errors.js').AuthorisationError
const NotFoundError = require('../../libs/errors.js').NotFoundError

const fixtures = [
  {
    type: 'pineapple',
    method: 'GET',
    error: NotFoundError
  }, {
    type: 'user',
    method: 'SET',
    error: NotFoundError
  }, {
    type: 'user',
    method: 'GET'
  }, {
    type: 'language',
    method: 'GET',
    error: AuthenticationError
  }, {
    type: 'language',
    method: 'GET',
    userId: true
  }
]

describe('authorise', function () {
  fixtures.forEach(fixture => {
    const label =
      'should ' + (fixture.error ? 'not ' : '') +
      'allow user ' + fixture.userId +
      ' to ' + fixture.method +
      ' ' + fixture.type +
      (fixture.error ? ' (' + fixture.error.name + ')' : '')
    it(label, () => {
      if (!fixture.error) {
        authorise(fixture.type, fixture.method, fixture.userId)
        return
      }

      expect(() => {
        authorise(fixture.type, fixture.method, fixture.userId)
      }).to.throw(fixture.error)
    })
  })
})
