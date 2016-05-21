var chai = require('chai')
var expect = chai.expect

var credentialCodec = require('../../../libs/authenticate/credentialCodec.js')

var fixtures = [
  {
    b64s: ['dXNlcm5hbWU6cGFzc3dvcmQ=', // username:password
      'L3VzZXJuYW1lOnBhc3N3b3Jk'], // /username:password
    username: 'username',
    password: 'password'
  }, {
    // domain/username:password
    b64s: ['ZG9tYWluL3VzZXJuYW1lOnBhc3N3b3Jk'],
    domain: 'domain',
    username: 'username',
    password: 'password'
  }, {
    b64s: ['ZmlzaCUyNmNoaXBzOnJvY2shISE=', // fish%26chips:rock!!!
      'ZmlzaCZjaGlwczpyb2NrISEh'], // fish&chips:rock!!!
    username: 'fish&chips',
    password: 'rock!!!'
  }, {
    // d%3A%2F%3F/dave%3F!%2F%3B%3A%2F://::123
    b64s: ['ZCUzQSUyRiUzRi9kYXZlJTNGISUyRiUzQiUzQSUyRjovLzo6MTIz'],
    domain: 'd:/?',
    username: 'dave?!/;:/',
    password: '//::123'
  }
]

function testDecode (b64, credential) {
  var actualCredential = credentialCodec.decode(b64)
  expect(actualCredential.domain || '').to.equal(credential.domain || '')
  expect(actualCredential.username).to.equal(credential.username)
  expect(actualCredential.password).to.equal(credential.password)
}

function testEncode (b64, credential) {
  var actualB64 = credentialCodec.encode(credential)
  expect(actualB64).to.equal(b64)
}

describe('credentialCodec', function () {
  fixtures.forEach(function (fixture) {
    it(
      'should be able to encode ' + fixture.b64s[0],
      testEncode.bind(null, fixture.b64s[0], fixture)
    )
    fixture.b64s.forEach(function (b64) {
      it(
        'should be able to decode ' + b64,
        testDecode.bind(null, b64, fixture)
      )
    })
  })
})
