const { XmlWriter } = require('simple-xml-writer')

function renderToString (xmlFunctionComponent) {
  const writer = new XmlWriter(xmlFunctionComponent)
  return writer.toString()
}

module.exports = renderToString
