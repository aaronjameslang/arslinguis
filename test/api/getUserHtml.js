describe('GET /user HTML', function () {
  before(dbfixtures.load)

  it('should respond 200 OK, with Samantha Harrison', function (done) {
    var request = {
      path: '/user/d0bc1cb3-87c2-4d9c-9dde-6a02b40e1ebe',
      headers: {
        accept: 'text/html, application/json'
      }
    }
    var response = {
      headers: {
        'content-type': 'text/html'
      },
      _body: '<html/>'
    }
    dispatch(done, request, response)
  })
})
