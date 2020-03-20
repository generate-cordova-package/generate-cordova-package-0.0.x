const { joinTokens, joinWithSpaces } = require('../helpers/join-text')

const {
  COPYRIGHT_CAP,
  DASH,
  MARKDOWN_EMAIL_PREFIX,
  MARKDOWN_EMAIL_SUFFIX,
  PRESENT
} = require('./tokens')

const copyrightLine = ({ author, copyrightYear, email }) =>
  joinWithSpaces(
    COPYRIGHT_CAP,
    joinTokens(copyrightYear, DASH, PRESENT),
    author,
    joinTokens(MARKDOWN_EMAIL_PREFIX, email, MARKDOWN_EMAIL_SUFFIX)
  )

module.exports = copyrightLine
