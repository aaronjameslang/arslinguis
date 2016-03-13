describe('GET /user JSON', function() {
  before(dbfixtures.load);

  it('should respond 200 OK, with William Annis', function(done) {
    var request = {
      path: '/user/a0ebf328-0c73-4f22-8930-e013c17d3c2a',
      headers: {
        accept: 'application/json',
      },
    };
    var response = {
      headers: {
        'content-type': 'application/json',
      },
      _body: '' +
      '{"names":["William Annis"],"descriptions":["TODO: describe Willi' +
      'am Annis"],"type":"user","id":"a0ebf328-0c73-4f22-8930-e013c17d3' +
      'c2a"}',
    };
    dispatch(done, request, response);
  });

  it('should respond 200 OK, with Samantha Harrison', function(done) {
    var request = {
      path: '/user/d0bc1cb3-87c2-4d9c-9dde-6a02b40e1ebe',
      headers: {
        accept: 'application/json',
      },
    };
    var response = {
      headers: {
        'content-type': 'application/json',
      },
      _body: '' +
        '{"names":["Samantha Harrison"],"descriptions":["TODO: describe S' +
        'amantha Harrison"],"type":"user","id":"d0bc1cb3-87c2-4d9c-9dde-6' +
        'a02b40e1ebe"}',
    };
    dispatch(done, request, response);
  });

  it('should respond 200 OK, with eight users', function(done) {
    var request = {
      path: '/user',
      headers: {
        accept: 'application/json',
      },
    };
    var response = {
      headers: {
        'content-type': 'application/json',
      },
      _body: function(actualBody) {
        var data = JSON.parse(actualBody);
        expect(data).to.have.length(8);
      },
    };
    dispatch(done, request, response);
  });

});
