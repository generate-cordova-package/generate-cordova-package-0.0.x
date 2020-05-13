/* global it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const renderCordovaAppTree = require('../../lib/cordova-app/render')

const renderCordovaAppProperties = require('./render-cordova-app-properties.config')

it('renders fs-tree object correctly for cordova-app', () => {
  const outputTree = renderCordovaAppTree(renderCordovaAppProperties)

  // using JSON.stringify in this test case to help verify that
  // lib/helpers/xml-component-to-string.js handles invisible characters
  // such as unwanted carriage return (\r) & correct newline (\n)
  // all correctly
  expect(JSON.stringify(outputTree)).toMatchSnapshot()
})
