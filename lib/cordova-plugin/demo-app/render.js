const css = require('css')

const configXmlComponent = require('./components/config-xml-component')

const packageJsonObject = require('./components/package-json-object')

const indexHtmlComponent = require('./components/index-html-component')

const bodyCssObject = require('./components/body-css-object.js')

const demoAppJsComponent = require('./components/demo-app-js-component')

const copyrightLine = require('../../common/copyright-line')

const xmlComponentToString = require('../../helpers/xml-component-to-string')

const jsonObjectToString = require('../../helpers/json-object-to-string')

const jsComponentToString = require('../../helpers/js-component-to-string')

const prettierxStandardFormat = require('../../helpers/prettierx-standard-format')

const { joinLines, joinWithSpace } = require('../../helpers/join-text')

const { BLANK, COMMENT, MARKDOWN_TITLE } = require('../../common/tokens')

const render = properties => ({
  [properties.demoAppName]: {
    'README.md': joinLines(
      joinWithSpace(MARKDOWN_TITLE, properties.demoAppName),
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
      'app.js': joinLines(
        joinWithSpace(COMMENT, copyrightLine(properties)),
        BLANK,
        prettierxStandardFormat(
          jsComponentToString(demoAppJsComponent(properties))
        )
        // (trailing newline already added by prettierx)
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
