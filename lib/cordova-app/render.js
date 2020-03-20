const css = require('css')

const configXmlComponent = require('./components/config-xml-component')

const packageJsonObject = require('./components/package-json-object')

const indexHtmlComponent = require('./components/index-html-component')

const bodyCssObject = require('./components/body-css-object.js')

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
    'config.xml': joinLines(
      xmlComponentToString(configXmlComponent(properties)),
      // add newline to the end:
      BLANK
    ),
    'package.json': joinLines(
      jsonObjectToString(packageJsonObject(properties)),
      // add newline to the end:
      BLANK
    ),
    www: {
      'index.html': joinLines(
        xmlComponentToString(indexHtmlComponent(properties)),
        // add newline to the end:
        BLANK
      ),
      'body.css': joinLines(
        css.stringify(bodyCssObject()),
        // add newline to the end:
        BLANK
      )
    }
  }
})

module.exports = render
