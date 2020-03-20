/* global jest, it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const startMain = require('../../../lib/start-main-cli')

const packageInfo = require('../../../package.json')

const mockOutputLog = []

const mockCheckPackageName = packageInfo.name

jest.mock('update-notifier', () => ({ pkg }) => {
  // check the required info:
  expect(pkg.name).toBe(mockCheckPackageName)
  // avoid checking the specific version info
  expect(pkg.version).toBeDefined()

  return {
    // this call should show up in the test snapshot:
    notify: () => {
      mockOutputLog.push({ notify: null })
    }
  }
})

jest.mock('prompts', () => (_, options) => {
  // cancel the first prompt - no nned to test further in this case

  // no need to check the actual prompt questions in this case
  // should just log the first question:
  mockOutputLog.push({ prompts: null })

  // signal result of Control-C:
  options.onCancel()

  // bogus resolved result which would be ignored in this case:
  return Promise.resolve({})
})

it('mocked CLI should call update-notifier before starting first prompt', async () => {
  // start main CLI and expect it to throw after the first prompt
  // (no need to check the exception message in this test case)
  await expect(startMain()).rejects.toThrow()

  // snapshot should show that CLI did call call update-notifier before
  // starting first prompt
  expect(mockOutputLog).toMatchSnapshot()
})
