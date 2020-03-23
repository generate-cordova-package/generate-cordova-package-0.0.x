const getAuthorDefaults = require('../common/get-author-defaults')

const promptQuestionsWithAuthorDefaults = ({ authorName, authorEmail }) => [
  { name: 'name', message: 'Cordova plugin name', default: 'demo-plugin' },
  { name: 'id', message: 'pluin id', default: 'com.demoplugin' },
  {
    name: 'description',
    message: 'Cordova plugin description',
    default: 'demo plugin'
  },
  { name: 'version', message: 'Initial plugin version', default: '0.0.1-dev' },
  { name: 'license', message: 'Cordova plugin license', default: 'MIT' },
  { name: 'author', message: 'Author name', default: authorName },
  { name: 'email', message: 'Author email', default: authorEmail },
  {
    name: 'jsModuleName',
    message: 'plugin JavaScript module name (without js extension)',
    default: 'demo'
  },
  {
    name: 'jsObjectName',
    message: 'plugin JavaScript object name',
    default: 'Demo'
  },
  {
    name: 'jsFunctionName',
    message: 'plugin JavaScript function name',
    default: 'demo'
  },
  { name: 'nativeObjectName', message: 'native object name', default: 'Demo' },
  {
    name: 'androidPackageName',
    message: 'Android package name',
    default: 'com.demo'
  },
  {
    name: 'nativeFunctionName',
    message: 'native function name',
    default: 'demo'
  }
]

function getPromptQuestions () {
  return getAuthorDefaults().then(
    // get the prompt questions with the resolved author defaults
    promptQuestionsWithAuthorDefaults
  )
}

module.exports = getPromptQuestions
