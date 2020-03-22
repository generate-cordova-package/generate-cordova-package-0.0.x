// *functional* component that can be rendered to a string by simple-xml-writer

const {
  joinWithDot,
  joinWithSlash,
  joinTogether
} = require('../../helpers/join-text')

const {
  BLANK,
  JAVASCRIPT_EXTENSION,
  WWW_DIRECTORY_NAME
} = require('../../common/tokens')

const renderWithProperties = ({
  name,
  description,
  id,
  version,
  jsModuleName,
  jsObjectName
}) => e =>
  e('plugin', (e, a) => {
    a('id', id)
    a('version', version)
    e('name', name)
    e('js-module', (e, a) => {
      a(
        'src',
        joinTogether(
          joinWithSlash(
            WWW_DIRECTORY_NAME,
            joinWithDot(jsModuleName, JAVASCRIPT_EXTENSION)
          )
        )
      )
      a('name', jsObjectName)
      // simple plugin js module startup
      e('runs', BLANK)
    })
  })

module.exports = renderWithProperties
