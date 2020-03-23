/* global jest, it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const snapshotDiff = require('snapshot-diff')

const startMain = require('../../../lib/start-main-cli')

const renderCordovaPluginTree = require('../../../lib/cordova-plugin/render')

const renderCordovaPluginProperties = require('../../render-cordova-plugin/render-cordova-plugin-properties.config')

const renderPluginDemoApp = require('../../../lib/cordova-plugin/demo-app/render')

const mockOutputLog = []

const mockMainPromptResponse = {
  moduleType: 'cordova-plugin'
}

const mockPluginResponseProperties = renderCordovaPluginProperties

const mockDemoAppResponseProperties = {
  demoAppName: 'test-plugin-demo-app',
  ...renderCordovaPluginProperties,
  id: 'cc.plugintestdemo',
  // plugin property that should be removed here:
  name: null
}

// map response by prompt questions[0].name:
const mockResponseMap = {
  // select module type:
  moduleType: mockMainPromptResponse,
  // cordova-plugin questions, starting with plugin name:
  name: mockPluginResponseProperties,
  // demo app questions, starting with demoAppName:
  demoAppName: mockDemoAppResponseProperties
}

jest.mock('gitconfig', () => ({
  get: options => {
    mockOutputLog.push({ gitconfig: options })

    return Promise.resolve({
      user: { name: 'chris', email: 'chris@chris.com' }
    })
  }
}))

jest.mock('prompts', () => (questions, _) => {
  // with options ignored in this test case

  mockOutputLog.push({ prompts: { questions } })

  return Promise.resolve(mockResponseMap[questions[0].name])
})

jest.mock('moment', () => () => ({
  // (starting to look forward):
  year: () => 2023
}))

jest.mock('fs-tree', () => tree => {
  mockOutputLog.push({ fsTree: tree })
})

it('start and run mocked CLI to create cordova-plugin', async () => {
  await startMain()

  // NOTE that the results of `lib/cordova-plugin/render.js` &
  // `lib/cordova-plugin/demo-app/render.js` are checked in
  // other test cases - no need to check here.
  expect(
    snapshotDiff(
      // compare mockOutputLog to array of rendered plugin & demo app trees:
      [
        renderCordovaPluginTree(renderCordovaPluginProperties),
        renderPluginDemoApp(mockDemoAppResponseProperties)
      ],
      mockOutputLog,
      // for cleaner snapshot diffs
      { contextLines: 1, stablePatchmarks: true }
    )
  ).toMatchSnapshot()
})
