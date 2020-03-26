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

// render with these properties (including copyrightYear)
// is covered by another test case:
const mockPluginResponseProperties = {
  ...renderCordovaPluginProperties,
  // should not be part of this mock prompt response:
  copyrightYear: undefined
}

const mockDemoAppResponseProperties = {
  demoAppName: 'test-plugin-demo-app',
  ...renderCordovaPluginProperties,
  id: 'cc.plugintestdemo',
  // should not be part of this mock prompt response:
  name: undefined,
  copyrightYear: undefined
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
        renderPluginDemoApp(renderCordovaPluginProperties)
      ],
      mockOutputLog,
      // for cleaner snapshot diffs
      { contextLines: 1, stablePatchmarks: true }
    )
  ).toMatchSnapshot()
})
