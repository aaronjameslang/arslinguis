const chai = require('chai')
chai.use(require('chai-properties'))
const expect = chai.expect
const requestParser = require('../../../libs/authenticate/requestParser')

describe('requestParser', function () {
  it(
    'should getSessionId',
    () => {
      const sessionId = 'a88c2b42-abbf-4b78-a71e-39c4462f8bfb'
      const request = {cookies: {'arslinguis-session-id': sessionId}}
      expect(sessionId, requestParser.getSessionId(request))
    }
  )
  it(
    'should getCredential',
    () => {
      const request = {headers: {authorization: 'Basic cm9iOmNoYW5nZW1l'}}
      const expectedCredential = {username: 'rob', password: 'changeme'}
      const actualCredential = requestParser.getCredential(request)
      expect(expectedCredential).to.have.properties(actualCredential)
    }
  )
})
