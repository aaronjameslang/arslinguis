chai.use(require('chai-as-promised'))

const getCollection = require('../../libs/repository/getMongoCollection')

describe('getMongoCollection', function () {
  beforeEach(dbfixtures.load)
  it('should connect succesfully', function () {
    return getCollection().then(collection => {
      expect(collection).to.be.an('object')
    })
  })
  it('should respond with a record', function () {
    return getCollection()
      .then(collection => collection.findOne({}))
      .then(function (record) {
        expect(record).to.be.an('object')
        expect(record._id).to.be.a('string')
      })
  })
})
