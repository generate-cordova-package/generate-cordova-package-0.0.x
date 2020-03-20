/* global it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const renderCordovaAppTree = require('../../lib/cordova-app/render')

const renderCordovaAppProperties = require('./render-cordova-app-properties.config')

it('renders fs-tree object correctly for cordova-app', () => {
  const outputTree = renderCordovaAppTree(renderCordovaAppProperties)

  expect(outputTree).toMatchSnapshot()
})
