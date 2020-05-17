const pluginXmlWriter = require('./components/plugin-xml-writer')

const packageJsonObject = require('./components/package-json-object')

const pluginJsComponent = require('./components/plugin-js-component')

const javaxxx = require('./components/plugin-android-java-component')

const iosxxx = require('./components/plugin-ios-module-component')

const copyrightLine = require('../common/copyright-line')

const jsonObjectToString = require('../helpers/json-object-to-string')

const jsComponentToString = require('../helpers/js-component-to-string')

const prettierxStandardFormat = require('../helpers/prettierx-standard-format')

const {
  joinLines,
  joinWithDot,
  joinWithSpace
} = require('../helpers/join-text')

const {
  BLANK,
  COMMENT,
  JAVASCRIPT_EXTENSION,
  MARKDOWN_TITLE
} = require('../common/tokens')

const JAVA_EXTENSION = 'java'

const OBJECTIVE_C_MODULE_EXTENSION = 'm'

const jsFilename = jsModuleName =>
  joinWithDot(jsModuleName, JAVASCRIPT_EXTENSION)

const render = properties => ({
  [properties.name]: {
    'README.md': joinLines(
      joinWithSpace(MARKDOWN_TITLE, properties.name),
      BLANK,
      copyrightLine(properties),
      // add newline to the end:
      BLANK
    ),
    'package.json': joinLines(
      jsonObjectToString(packageJsonObject(properties)),
      // add newline to the end:
      BLANK
    ),
    'plugin.xml': joinLines(
      pluginXmlWriter(properties).toString(),
      // add newline to the end:
      BLANK
    ),
    src: {
      android: {
        [joinWithDot(properties.nativeObjectName, JAVA_EXTENSION)]: javaxxx(
          properties
        )
      },
      ios: {
        [joinWithDot(
          properties.nativeObjectName,
          OBJECTIVE_C_MODULE_EXTENSION
        )]: iosxxx(properties)
      }
    },
    www: {
      [jsFilename(properties.jsModuleName)]: joinLines(
        joinWithSpace(COMMENT, copyrightLine(properties)),
        BLANK,
        prettierxStandardFormat(
          jsComponentToString(pluginJsComponent(properties))
        )
      )
    }
  }
})

module.exports = render
