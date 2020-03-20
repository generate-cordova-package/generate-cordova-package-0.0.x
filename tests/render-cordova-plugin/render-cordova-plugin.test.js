/* global it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const renderCordovaPluginTree = require('../../lib/cordova-plugin/render')

const renderCordovaPluginProperties = require('./render-cordova-plugin-properties.config')

it('renders fs-tree object correctly for cordova-plugin', () => {
  const outputTree = renderCordovaPluginTree(renderCordovaPluginProperties)

  expect(outputTree).toMatchSnapshot()
})
