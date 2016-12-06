chai.use(require('chai-as-promised'))

const getCollection = require('../../libs/repository/getMongoCollection')

describe('getMongoCollection', function () {
  beforeEach(dbfixtures.load)
  it('should connect succesfully', function () {
    return getCollection().then(collection => {
      expect(collection).to.be.an('object')
    })
  })
  it('should respond with a document', function () {
    return getCollection()
      .then(collection => collection.findOne({}))
      .then(function (document) {
        expect(document).to.be.an('object')
        expect(document._id).to.be.a('string')
      })
  })
})
