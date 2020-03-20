/* global jest, it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

const mockOutputLog = []

const prettierxStandardFormat = require('../../../lib/helpers/prettierx-standard-format')

jest.mock('prettierx', () => ({
  format: (source, options) => {
    // to check that correct options were used *including* parser option
    mockOutputLog.push({ prettierxFormat: { source, options } })

    // (do nothing in this case)
    return source
  }
}))

it('calls prettierx with correct options including correct parser', async () => {
  const testSource = 'console.log(1)'

  const result = prettierxStandardFormat(testSource)

  // quick & simple check
  expect(result.length).not.toBe(0)

  // now ensure correct options including correct parser option
  expect(mockOutputLog).toMatchSnapshot()
})
