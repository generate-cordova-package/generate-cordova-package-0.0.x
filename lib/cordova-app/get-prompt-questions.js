const getAuthorDefaults = require('../common/get-author-defaults')

const promptQuestionsWithAuthorDefaults = ({ authorName, authorEmail }) => [
  { name: 'name', message: 'Cordova app name', default: 'demo-app' },
  { name: 'id', message: 'Cordova app id', default: 'com.demoapp' },
  {
    name: 'description',
    message: 'Cordova app description',
    default: 'demo app'
  },
  { name: 'version', message: 'Initial app version', default: '0.0.1-dev' },
  { name: 'license', message: 'Cordova app license', default: 'MIT' },
  { name: 'author', message: 'author name', default: authorName },
  { name: 'email', message: 'author email', default: authorEmail }
]

function getPromptQuestions () {
  return getAuthorDefaults().then(
    // get the prompt questions with the resolved author defaults
    promptQuestionsWithAuthorDefaults
  )
}

module.exports = getPromptQuestions
