/* global jest, it, expect */
/* (see <https://github.com/standard/standard/issues/905>) */

jest.mock('prompts', () => (questions, options) => {
  // no mockOutput needed in this test

  // signal result of Control-C:
  options.onCancel()

  // bogus resolved result which would be ignored in this case:
  return Promise.resolve({})
})

const startMain = require('../../../lib/start-main-cli')

// This case is added to ensure that lib/helpers/prompt.js
// correctly handles user-cancelled prompt (by Control-C)
// (avoids some mutations that were discovered by Stryker Mutator)
it('mocked CLI with user-cancelled prompt', async () => {
  await expect(startMain()).rejects.toThrow('cancelled by user')
})
