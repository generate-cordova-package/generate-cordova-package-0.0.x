const { joinTogether, joinWithSpace } = require('../helpers/join-text')

const {
  COPYRIGHT_CAP,
  DASH,
  MARKDOWN_EMAIL_PREFIX,
  MARKDOWN_EMAIL_SUFFIX,
  PRESENT
} = require('./tokens')

const copyrightLine = ({ author, copyrightYear, email }) =>
  joinWithSpace(
    COPYRIGHT_CAP,
    joinTogether(copyrightYear, DASH, PRESENT),
    author,
    joinTogether(MARKDOWN_EMAIL_PREFIX, email, MARKDOWN_EMAIL_SUFFIX)
  )

module.exports = copyrightLine
