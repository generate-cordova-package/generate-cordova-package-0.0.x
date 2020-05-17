const XMLWriter = require('xml-writer')

const { XML_INDENT } = require('../../common/tokens')

const WIDGET_TAG = 'widget'
const NAME_TAG = 'name'
const DESCRIPTION_TAG = 'description'

const ID_ATTRIBUTE = 'id'
const VERSION_ATTRIBUTE = 'version'

function configXmlWriter (properties) {
  const xw = new XMLWriter(XML_INDENT)
  xw.startElement(WIDGET_TAG)
    .writeAttribute(ID_ATTRIBUTE, properties.id)
    .writeAttribute(VERSION_ATTRIBUTE, properties.version)
    .startElement(NAME_TAG)
    .text(properties.name)
    .endElement()
    .startElement(DESCRIPTION_TAG)
    .text(properties.description)
    .endElement()
    .endElement()

  return xw
}

module.exports = configXmlWriter
