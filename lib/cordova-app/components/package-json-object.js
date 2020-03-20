// ref:
// https://docs.npmjs.com/files/package.json

const copyrightLine = require('../../common/copyright-line')

const { joinWithSpaces } = require('../../helpers/join-text')

const { COMMENT, COPYRIGHT } = require('../../common/tokens')

const copyrightCommentKey = joinWithSpaces(COMMENT, COPYRIGHT)

const renderObject = properties =>
  Object.assign(
    {},
    { name: properties.name },
    { version: properties.version },
    {
      [copyrightCommentKey]: copyrightLine(properties)
    },
    { description: properties.description },
    { license: properties.license },
    { author: { name: properties.author, email: properties.email } }
  )

module.exports = renderObject
