/* global it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const renderPluginDemoApp = require('../../lib/cordova-plugin/demo-app/render')

const demoAppProperties = {
  demoAppName: 'test-plugin-demo-app',
  id: 'cc.plugintestdemo',
  description: 'plugin demo app',
  version: '0.1.3',
  license: 'ISC',
  author: 'Alice',
  email: 'alice@alice.com;',
  jsObjectName: 'TestObject',
  jsFunctionName: 'testFunction',
  // added by `lib/with-copyright-year.js`
  // when used from the CLI:
  copyrightYear: 2023
}

it('renders fs-tree object correctly for Cordova plugin demo app', () => {
  const outputTree = renderPluginDemoApp(demoAppProperties)

  expect(outputTree).toMatchSnapshot()
})
