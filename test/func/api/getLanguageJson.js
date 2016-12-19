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
      _body: '401: Permission denied, try logging in'
    }
    dispatch(done, request, response)
  })

  it('should respond 200 OK, with content', function (done) {
    var request = {
      path: '/language/d02e2092-0fb5-4d26-98a0-bfe879d379f8',
      headers: {
        cookie: 'arslinguis-session-id=40046187-b533-4d15-93c7-d5f25362f7fa'
      }
    }
    var response = {
      statusCode: 200,
      headers: {
        accept: 'application/json'
      },
      _body: ''
    }
    dispatch(done, request, response)
  })

})
