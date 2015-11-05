describe('GET /user HTML', function() {
  before(dbfixtures.load);

  it('should respond 200 OK, with William Annis', function(done) {
    var request = {
      path: '/users/a0ebf328-0c73-4f22-8930-e013c17d3c2a',
      headers: {
        accept: 'text/html',
      },
    };
    var response = {
      headers: {
        'content-type': 'text/html',
      },
      _body: function(actualBody) {
        var substrings = ['William Annis', 'describe William Annis'];
        substrings.forEach(function(substring) {
          expect(actualBody).to.contain(substring);
        });
      },
    };
    dispatch(done, request, response);
  });

});
