const { BLANK, DOT, NEWLINE, SLASH, SPACE } = require('../common/tokens')

function withTokenJoinParts (token, ...parts) {
  return [].concat(parts).join(token)
}

const newJoinWithTokenHelper = token => (...parts) =>
  withTokenJoinParts(token, ...parts)

const joinLines = newJoinWithTokenHelper(NEWLINE)

const joinWithDot = newJoinWithTokenHelper(DOT)

const joinWithSlash = newJoinWithTokenHelper(SLASH)

const joinWithSpace = newJoinWithTokenHelper(SPACE)

const joinTogether = newJoinWithTokenHelper(BLANK)

module.exports = {
  joinLines,
  joinWithDot,
  joinWithSlash,
  joinWithSpace,
  joinTogether,
  withTokenJoinParts
}
