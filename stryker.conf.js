/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutator: 'javascript',
  mutate: [
    // FUTURE TBD:
    // 'bin/**/*.js',
    // make this explicit:
    'lib/**/*.js'
  ],
  packageManager: 'npm',
  reporters: [
    // static:
    'html',
    'clear-text',
    // dynamic:
    'progress'
  ],
  testRunner: 'jest',
  transpilers: [],
  coverageAnalysis: 'off'
}
