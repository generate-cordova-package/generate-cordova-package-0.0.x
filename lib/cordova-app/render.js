const configXmlComponent = require('./components/config-xml-component')

const packageJsonObject = require('./components/package-json-object')

const indexHtmlComponent = require('./components/index-html-component')

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
      copyrightLine(properties)
    ),
    'config.xml': xmlComponentToString(configXmlComponent(properties)),
    'package.json': jsonObjectToString(packageJsonObject(properties)),
    www: {
      'index.html': xmlComponentToString(indexHtmlComponent(properties))
    }
  }
})

module.exports = render
