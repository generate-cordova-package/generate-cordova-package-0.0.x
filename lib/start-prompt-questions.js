const startPromptQuestions = [
  {
    type: 'select',
    name: 'moduleType',
    message: 'Select module type',
    choices: [
      { title: 'Cordova app', value: 'cordova-app' },
      { title: 'Cordova plugin', value: 'cordova-plugin' }
    ],
    // default *required* to work with `lib/helpers/prompt.js`
    default: 0
  }
]

module.exports = startPromptQuestions
