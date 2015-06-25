describe('GET /language JSON', function () {
  before(dbfixtures.load)

  it('should respond 401 Unauthorised, with no content', function (done) {
    var request = {
      path: '/language/d02e2092-0fb5-4d26-98a0-bfe879d379f8',
      headers: {
        accept: 'application/json'
      }
    }
    var response = {
      statusCode: 401,
      headers: {},
      _body: '401: '
    }
    dispatch(done, request, response)
  })
})
