/* global it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const renderCordovaAppTree = require('../../../lib/cordova-app/render')

const renderCordovaAppProperties = require('../render-cordova-app-properties.config')

// verify the output characters more precisely using JSON.stringify()
// should help avoiding issues such as unwanted carriage return (\\r)
// that was output by the simple-xml-writer package
it('renders fs-tree object precisely correctly for cordova-app, as verified by using JSON.stringify()', () => {
  const outputTree = renderCordovaAppTree(renderCordovaAppProperties)

  // wrapping the JSON string into an object as a trick to
  // keep the description and JSON string output on separate lines
  // in the test snapshot
  expect({ jsonString: JSON.stringify(outputTree) }).toMatchSnapshot()
})
