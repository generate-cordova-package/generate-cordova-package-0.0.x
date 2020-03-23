const getPromptQuestionsForDemoApp = pluginProperties => [
  {
    name: 'demoAppName',
    message: 'Cordova plugin demo app name',
    default: 'demo-app'
  },
  { name: 'id', message: 'Cordova plugin demo app id', default: 'com.demoapp' },
  {
    name: 'description',
    message: 'Cordova plugin demo app description',
    default: 'demo app'
  },
  { name: 'version', message: 'plugin demo app version', default: '0.0.1-dev' },
  { name: 'license', message: 'plugin demo app license', default: 'MIT' },
  {
    name: 'author',
    message: 'demo app author name',
    default: pluginProperties.author
  },
  {
    name: 'email',
    message: 'demo app author email',
    default: pluginProperties.email
  },
  {
    name: 'jsObjectName',
    message:
      'demo app JavaScript object name from plugin (should match plugin)',
    default: pluginProperties.jsObjectName
  },
  {
    name: 'jsFunctionName',
    message:
      'demo app JavaScript function name from plugin (should match plugin)',
    default: pluginProperties.jsFunctionName
  }
]

module.exports = getPromptQuestionsForDemoApp
