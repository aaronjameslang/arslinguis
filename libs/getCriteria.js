var liburl = require('url')

module.exports = getCriteria

function getCriteria (url) {
  var parts = liburl.parse(url, true).path.split('/')
  var criteria = {}

  if (parts.length && !parts[0]) {
    parts.shift() // leading slash
  }

  if (!parts.length) {
    throw new Error('Illegal Argument, url path  too short: "' + url + '"')
  }

  if (parts.length % 2 === 0) {
    criteria.id = parts.pop()
  }

  if (!parts.length) {
    throw new Error('Mathematically impossible')
  }

  criteria.type = parts.pop()

  if (!parts.length) {
    return criteria
  }

  var parentId = parts.pop()
  var parentType = parts.pop()
  criteria[parentType + 'Id'] = parentId

  return criteria
}
