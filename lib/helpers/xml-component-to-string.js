const { XmlWriter } = require('simple-xml-writer')

function renderToString (xmlFunctionComponent) {
  const writer = new XmlWriter(xmlFunctionComponent)

  const xmlString = writer
    .toString()
    // quick workaround for now, at least:
    .replace(/\r\n/g, '\n')

  return xmlString
}

module.exports = renderToString
