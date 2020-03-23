// *functional* component that can be rendered to a string by simple-xml-writer

const {
  joinWithDot,
  joinWithSlash,
  joinTogether
} = require('../../helpers/join-text')

const {
  ID_TAG,
  JS_MODULE_NAME_TAG,
  JS_MODULE_TAG,
  RUNS_TAG,
  SRC_TAG,
  TOP_PLUGIN_TAG,
  VERSION_TAG
} = require('../tokens/plugin-xml-tokens')

const {
  BLANK,
  JAVASCRIPT_EXTENSION,
  WWW_DIRECTORY_NAME
} = require('../../common/tokens')

const renderWithProperties = ({
  description,
  id,
  version,
  jsModuleName,
  jsObjectName
}) => e =>
  e(TOP_PLUGIN_TAG, (e, a) => {
    a(ID_TAG, id)
    a(VERSION_TAG, version)

    e(JS_MODULE_TAG, (e, a) => {
      a(
        SRC_TAG,
        joinTogether(
          joinWithSlash(
            WWW_DIRECTORY_NAME,
            joinWithDot(jsModuleName, JAVASCRIPT_EXTENSION)
          )
        )
      )
      a(JS_MODULE_NAME_TAG, jsObjectName)

      e(RUNS_TAG, BLANK)
    })
  })

module.exports = renderWithProperties
