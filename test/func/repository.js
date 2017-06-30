chai.use(require('chai-as-promised'))

const repository = require('../../libs/repository')

describe('repository', function () {
  beforeEach(dbfixtures.load)
  it('should respond with a record', function () {
    return repository.retrieveMany({})
      .then(records => {
        const record = records[0]
        expect(record).to.be.an('object')
        expect(record.type).to.be.a('string')
      })
  })
  it('should respond with a user', function () {
    return repository.retrieveMany({type: 'user'})
      .then(records => {
        const record = records[0]
        expect(record).to.be.an('object')
        expect(record.type).to.equal('user')
      })
  })
  it('should retrieve with user a0eb Annis', function () {
    return repository.retrieveOne({id: 'a0ebf328-0c73-4f22-8930-e013c17d3c2a', type: 'user'})
      .then(record => {
        expect(record).to.be.an('object')
        expect(record.type).to.equal('user')
        expect(record.names[0]).to.equal('William Annis')
      })
  })
  it('should respond with a language', function () {
    return repository.retrieveMany({type: 'language'})
      .then(records => {
        const record = records[0]
        expect(record).to.be.an('object')
        expect(record.type).to.equal('language')
      })
  })
  it('should save an object, and add an id', function () {
    return repository.create({
      type: 'dog',
      name: 'fido'
    }).then(id => {
      expect(id).to.be.a('string')
      expect(id).to.have.length(36)
      return repository.retrieveOne({id: id})
    }).then(record => {
      expect(record).to.be.an('object')
      expect(record.type).to.equal('dog')
      expect(record.name).to.equal('fido')
      expect(record.id).to.be.a('string')
      expect(record.id).to.have.length(36)
    })
  })
})
