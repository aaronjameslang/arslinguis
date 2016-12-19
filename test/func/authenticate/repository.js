const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))
chai.use(require('chai-properties'))

const dbfixtures = require('../../_support/dbfixtures')

const repository = require('../../../libs/authenticate/repository')
const db = require('../../../libs/db')

describe('authenticate', function () {
  describe('repository', function () {
    before(dbfixtures.load)

    it(
        'should getCredential without domain', () => {
          return repository.getCredential('sai')
            .then(credential => {
              expect(credential).to.have.properties({
                'id': '2a9be023-b211-45cb-9f9a-b7092991924e',
                'username': 'sai',
                'userId': '3b7e4e45-5a03-42c2-9f18-ef524324a8da',
                'type': 'credential',
                'hashcode': '$2a$10$xVPGW3z740yO4LYuiFoM3epUggnAPbNLNW4RFjM.MFKojS0eTY2X.'
              })
            })
        })

    it(
      'should getSessionById', () => {
        return repository.getSessionById('ba275789-6e9a-4166-9206-6363f635d9f1')
          .then(session => {
            expect(session).to.have.properties({
              'id': 'ba275789-6e9a-4166-9206-6363f635d9f1',
              'userId': 'b3b0ee43-f6f3-4296-94b5-f45a0fccdb23',
              'type': 'session',
              'ctime': 1464370529660
            })
          })
      })

    it(
      'should return null if no getSessionById', () => {
        return repository.getSessionById('invalid-id')
          .then(session => {
            expect(session).to.equal(null)
          })
      })

    it(
      'should createSession', () => {
        let session = null
        return repository.createSession('6694b1dd-26d6-48c2-b9fc-953038686502')
          .then(session_ => {
            session = session_
            expect(session).to.be.an('object')
            expect(session.id).to.be.a('string')
            expect(session.type).to.equal('session')
            expect(session.userId).to.equal('6694b1dd-26d6-48c2-b9fc-953038686502')
            expect(session.ctime).to.be.an('number')
            return db.findOne({id: session.id})
          }).then(session_ => {
            expect(session_).to.have.properties(session)
          })
      })
  })
})
