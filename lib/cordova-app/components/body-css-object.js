const renderCssObject = () => ({
  // NOTE: explicit `type` value does not seem to be needed here
  // and would be flagged as a "surviving mutant" by Stryker.
  // type: 'stylesheet',
  stylesheet: {
    rules: [
      {
        type: 'rule',
        selectors: ['body'],
        declarations: [
          // body background-color is needed for proper rendering on
          // Cordova "osx" (macOS) platform
          { type: 'declaration', property: 'background-color', value: '#fff' }
        ]
      }
    ]
  }
})

module.exports = renderCssObject
