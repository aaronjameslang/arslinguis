var chai = require('chai')
var expect = chai.expect
var http = require('http')

var authenticate = require('../../libs/authenticate.js')

var passwords = {
  'christophe.grandsire-koevoets': '3kPTRbVWFtoCHqAsiJoVsTyCwmwg7wAN.christophe.grandsire-koevoets',
  'david.peterson': 'TRNawvy97skk4hxishETr4NybTTMEdRJ.david.peterson',
  'george.corley': 'vvhtaXqo4TcFVXtwaKtgchAWUHpprvYn.george.corley',
  'john.quijada': 'bmrEk7cz7ipUhzmaVbM7TusPLxfziAqj.john.quijada',
  'matt.pearson': 'EMCxvCpvkpVywxkfPqCdoKPmFg4PxWK9.matt.pearson',
  sai: 'imKMpL49M4YLfuuKabuibeFTdoJXjEyx.sai',
  'samantha.harrison': 'nPUM9PMMrbszJJTHmnaLncKVjhFKqVnu.samantha.harrison',
  'william.annis': 'oA7EnpstRPqgqgWnLuVePj7RY7Ax3tAk.william.annis'
}

function Request () {}

describe('authenticate', function () {
  before(dbfixtures.load)
  var sessionId
  it('should be able to log in as Sam', function () {
    var request = new Request()
    request.cookies = {}
    var name = 'samantha.harrison'
    var buffer = new Buffer(name + ':' + passwords[name])
    var authorization = 'Basic ' + buffer.toString('base64')
    request.headers = {authorization: authorization}
    return authenticate(request)
      .then(function (session) {
        expect(session).to.be.an('object')
        expect(session.type).to.equal('session')
        expect(session.userId).to.equal('d0bc1cb3-87c2-4d9c-9dde-6a02b40e1ebe')
        expect(session.id).to.be.a('string')
        expect(session.id).to.have.length(36)
        sessionId = session.id
      })
  })
  it('should stay logged in as Sam', function () {
    var request = new Request()
    request.cookies = {'arslinguis-session-id': sessionId}
    return authenticate(request)
      .then(function (session) {
        expect(session).to.be.an('object')
        expect(session.type).to.equal('session')
        expect(session.userId).to.equal('d0bc1cb3-87c2-4d9c-9dde-6a02b40e1ebe')
        expect(session.id).to.equal(sessionId)
      })
  })
})
