module.exports = getCookie;

function getCookies(request) {
  if (request.cookies) {
    return request.cookies;
  }

  request.cookies = {};

  if (!request.headers.cookie) {
    return request.cookies;
  }

  request.headers.cookie.split(';')
  .forEach(function(cookie) {
    var parts = cookie.split('=');
    var name = parts.shift().trim();
    var value = decodeURIComponent(parts.join('='));
    request.cookies[name] = value;
  });

  return request.cookies;
}

function getCookie(request, cookieName) {
  var cookies = getCookies(request);
  return cookies[cookieName];
}
