/* global jest, it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const snapshotDiff = require('snapshot-diff')

const startMain = require('../../../lib/start-main-cli')

const renderCordovaPluginTree = require('../../../lib/cordova-plugin/render')

const renderCordovaPluginProperties = require('../../render-cordova-plugin/render-cordova-plugin-properties.config')

const mockOutputLog = []

const mockMainPromptResponse = {
  moduleType: 'cordova-plugin'
}

const mockPluginResponseProperties = renderCordovaPluginProperties

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

  return Promise.resolve(
    questions[0].name === 'moduleType'
      ? mockMainPromptResponse
      : mockPluginResponseProperties
  )
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

  // NOTE that the results of `lib/cordova-plugin/render.js`
  // are checked in another test case;
  // no need to check here.
  expect(
    snapshotDiff(
      // with rendered tree in an array to make snapshot-diff happy
      [renderCordovaPluginTree(renderCordovaPluginProperties)],
      mockOutputLog,
      // cleaner snapshot diffs
      { contextLines: 1, stablePatchmarks: true }
    )
  ).toMatchSnapshot()
})
