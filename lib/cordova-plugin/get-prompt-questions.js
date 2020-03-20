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
  { name: 'email', message: 'Author email', default: authorEmail }
]

function getPromptQuestions () {
  return getAuthorDefaults().then(
    // get the prompt questions with the resolved author defaults
    promptQuestionsWithAuthorDefaults
  )
}

module.exports = getPromptQuestions
