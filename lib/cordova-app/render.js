const css = require('css')

const configXmlWriter = require('./components/config-xml-writer')

const packageJsonObject = require('./components/package-json-object')

const indexHtmlWriter = require('./components/index-html-writer')

const bodyCssObject = require('./components/body-css-object.js')

const appJsComponent = require('./components/app-js-component')

const copyrightLine = require('../common/copyright-line')

const jsonObjectToString = require('../helpers/json-object-to-string')

const jsComponentToString = require('../helpers/js-component-to-string')

const prettierxStandardFormat = require('../helpers/prettierx-standard-format')

const { joinLines, joinWithSpace } = require('../helpers/join-text')

const { BLANK, COMMENT, MARKDOWN_TITLE } = require('../common/tokens')

const render = properties => ({
  [properties.name]: {
    'README.md': joinLines(
      joinWithSpace(MARKDOWN_TITLE, properties.name),
      BLANK,
      copyrightLine(properties),
      // add newline to the end:
      BLANK
    ),
    'config.xml': joinLines(
      configXmlWriter(properties).toString(),
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
        indexHtmlWriter(properties).toString(),
        // add newline to the end:
        BLANK
      ),
      'app.js': joinLines(
        joinWithSpace(COMMENT, copyrightLine(properties)),
        BLANK,
        prettierxStandardFormat(jsComponentToString(appJsComponent))
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
