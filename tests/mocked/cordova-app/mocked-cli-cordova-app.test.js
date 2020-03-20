/* global jest, it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const snapshotDiff = require('snapshot-diff')

const startMain = require('../../../lib/start-main-cli')

const renderCordovaAppTree = require('../../../lib/cordova-app/render')

const renderCordovaAppProperties = require('../../render-cordova-app/render-cordova-app-properties.config')

const mockMainPromptResponse = {
  moduleType: 'cordova-app'
}

// render with these properties is covered by another test case:
const mockAppResponseProperties = renderCordovaAppProperties

const mockOutputLog = []

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
      : mockAppResponseProperties
  )
})

jest.mock('moment', () => () => ({
  // (starting to look forward):
  year: () => 2023
}))

jest.mock('fs-tree', () => tree => {
  mockOutputLog.push({ fsTree: tree })
})

it('start and run mocked CLI to create cordova-app', async () => {
  await startMain()

  // NOTE that the results of `lib/cordova-app/render.js` are
  // checked in another test case - no need to check here
  expect(
    snapshotDiff(
      // with rendered tree in an array to make snapshot-diff happy
      [renderCordovaAppTree(mockAppResponseProperties)],
      mockOutputLog,
      // cleaner snapshot diffs
      { contextLines: 1, stablePatchmarks: true }
    )
  ).toMatchSnapshot()
})
