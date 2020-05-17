const XMLWriter = require('xml-writer')

const { BLANK, XML_INDENT } = require('../../common/tokens')

const HTML_TAG = 'html'
const HEADER_TAG = 'header'
const LINK_TAG = 'link'
const BODY_TAG = 'body'
const H1_TAG = 'h1'
const DIV_TAG = 'div'
const SCRIPT_TAG = 'script'

const REL_ATTRIBUTE = 'rel'
const HREF_ATTRIBUTE = 'href'
const ID_ATTRIBUTE = 'id'
const SRC_ATTRIBUTE = 'src'

const REL_STYLESHEET_VALUE = 'stylesheet'
const BODY_CSS_HREF = 'body.css'

const STATUS_DIV_ID = 'status'

const CORDOVA_JS_SCRIPT_NAME = 'cordova.js'
const APP_JS_SCRIPT_NAME = 'app.js'

function indexHtmlWriter (properties) {
  const xw = new XMLWriter(XML_INDENT)

  xw.startElement(HTML_TAG)
    .startElement(HEADER_TAG)
    .startElement(LINK_TAG)
    .writeAttribute(REL_ATTRIBUTE, REL_STYLESHEET_VALUE)
    .writeAttribute(HREF_ATTRIBUTE, BODY_CSS_HREF)
    .endElement()
    .endElement()
    .startElement(BODY_TAG)
    .startElement(H1_TAG)
    .text(properties.name)
    .endElement()
    .startElement(DIV_TAG)
    .writeAttribute(ID_ATTRIBUTE, STATUS_DIV_ID)
    .endElement()
    .startElement(SCRIPT_TAG)
    .writeAttribute(SRC_ATTRIBUTE, CORDOVA_JS_SCRIPT_NAME)
    .text(BLANK)
    .endElement()
    .startElement(SCRIPT_TAG)
    .writeAttribute(SRC_ATTRIBUTE, APP_JS_SCRIPT_NAME)
    .text(BLANK)
    .endElement()
    .endElement()
    .endElement()

  return xw
}

module.exports = indexHtmlWriter
