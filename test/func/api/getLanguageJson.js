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
        'content-type': 'application/json'
      },
      _body: JSON.stringify({
        'iso639_1': '',
        'names': ['Thhtmaa'],
        'descriptions': ['TODO: describe Thhtmaa by matt.pearson'],
        'type': 'language',
        'userId': '053a5c6f-7d03-44e4-8ec8-20728b97cb5f',
        'id': 'd02e2092-0fb5-4d26-98a0-bfe879d379f8'
      })
    }
    dispatch(done, request, response)
  })

})
