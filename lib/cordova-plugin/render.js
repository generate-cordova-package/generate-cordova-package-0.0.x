const pluginXmlComponent = require('./components/plugin-xml-component')

const packageJsonObject = require('./components/package-json-object')

const copyrightLine = require('../common/copyright-line')

const xmlComponentToString = require('../helpers/xml-component-to-string')

const jsonObjectToString = require('../helpers/json-object-to-string')

const { joinWithSpaces, joinLines } = require('../helpers/join-text')

const { BLANK, TITLE1 } = require('../common/tokens')

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
    )
  }
})

module.exports = render
