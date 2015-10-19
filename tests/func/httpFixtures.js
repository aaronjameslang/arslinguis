var fixtures = module.exports = [];

fixtures.push({
  "request" : {
    "method" : "GET",
    "path" : "/users/a0ebf328-0c73-4f22-8930-e013c17d3c2a",
    "headers" : {
      "accept" : "application/json"
    }
  },
  "response" : {
    "statusCode" : 200,
    "headers" : {
      "content-type" : "application/json"
    },
    "_body" : "{\"names\":[\"William Annis\"],\"descriptions\":[\"TODO: describe William Annis\"],\"type\":\"user\",\"id\":\"a0ebf328-0c73-4f22-8930-e013c17d3c2a\"}"
  }
});

fixtures.push({
  "request" : {
    "method" : "GET",
    "path" : "/users/d0bc1cb3-87c2-4d9c-9dde-6a02b40e1ebe",
    "headers" : {
      "accept" : "application/json"
    }
  },
  "response" : {
    "statusCode" : 200,
    "headers" : {
      "content-type" : "application/json"
    },
    "_body" : "{\"names\":[\"Samantha Harrison\"],\"descriptions\":[\"TODO: describe Samantha Harrison\"],\"type\":\"user\",\"id\":\"d0bc1cb3-87c2-4d9c-9dde-6a02b40e1ebe\"}"
  }
});

fixtures.push({
  "request" : {
    "method" : "GET",
    "path" : "/users",
    "headers" : {
      "accept" : "application/json"
    }
  },
  "response" : {
    "statusCode" : 200,
    "headers" : {
      "content-type" : "application/json"
    },
    "_body" : ""
  }
});

fixtures.push({
  "request" : {
    "method" : "GET",
    "path" : "/users/a0ebf328-0c73-4f22-8930-e013c17d3c2a",
    "headers" : {
      "accept" : "text/html"
    }
  },
  "response" : {
    "statusCode" : 200,
    "headers" : {
      "content-type" : "text/html"
    },
    "_body" : function(actualBody, chai) {
      var substrings = ['William Annis', 'describe William Annis'];
      substrings.forEach(function(substring) {
        chai.expect(actualBody).to.contain(substring);
      });
    }
  }
});
