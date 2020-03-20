const pluginXmlComponent = require('./components/plugin-xml-component')

const packageJsonObject = require('./components/package-json-object')

const pluginJsComponent = require('./components/plugin-js-component')

const copyrightLine = require('../common/copyright-line')

const xmlComponentToString = require('../helpers/xml-component-to-string')

const jsonObjectToString = require('../helpers/json-object-to-string')

const jsComponentToString = require('../helpers/js-component-to-string')

const prettierxStandardFormat = require('../helpers/prettierx-standard-format')

const { joinWithSpaces, joinLines } = require('../helpers/join-text')

const { BLANK, COMMENT, TITLE1 } = require('../common/tokens')

const jsFilename = jsModuleName => `${jsModuleName}.js`

const render = properties => ({
  [properties.name]: {
    'README.md': joinLines(
      joinWithSpaces(TITLE1, properties.name),
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
      xmlComponentToString(pluginXmlComponent(properties)),
      // add newline to the end:
      BLANK
    ),
    www: {
      [jsFilename(properties.jsModuleName)]: joinLines(
        joinWithSpaces(COMMENT, copyrightLine(properties)),
        BLANK,
        prettierxStandardFormat(
          jsComponentToString(pluginJsComponent(properties))
        )
      )
    }
  }
})

module.exports = render
