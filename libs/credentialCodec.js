exports.encode = encode;
exports.decode = decode;

function encode(credential) {
  var domain = '';
  if (credential.domain) {
    domain = encodeURIComponent(credential.domain) + '/';
  }
  var username = encodeURIComponent(credential.username);
  var password = credential.password;
  var string = domain + username + ':' + password ;
  var b64 = new Buffer(string).toString('base64');
  return b64;
}

function decode(b64) {
  var credential = {};
  var string = new Buffer(b64, 'base64').toString('utf8');

  var parts = string.split(':');
  credential.password = parts.slice(1).join(':');

  parts = parts[0].split('/');
  if (parts.length === 2) {
    credential.domain = decodeURIComponent(parts.shift());
  }
  credential.username = decodeURIComponent(parts[0]);

  return credential;
}
