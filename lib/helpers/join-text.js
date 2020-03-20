const { NEWLINE, SPACE } = require('../common/tokens')

function joinTokens (...tokens) {
  return [].concat(tokens).join('')
}

function joinWithSpaces (...tokens) {
  return [].concat(tokens).join(SPACE)
}

function joinLines (...lines) {
  return [].concat(lines).join(NEWLINE)
}

module.exports = { joinTokens, joinWithSpaces, joinLines }
