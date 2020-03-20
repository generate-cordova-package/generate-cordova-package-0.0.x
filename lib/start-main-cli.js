const updateNotifier = require('update-notifier')

const startPromptQuestions = require('./start-prompt-questions')

const prompt = require('./helpers/prompt')

const cordovaAppStartCli = require('./cordova-app/start-cli')

// NOT SUPPORTED at this point:
// const cordovaPluginStartCli = require('./cordova-plugin/start-cli')

const pkg = require('../package.json')

const startMap = {
  'cordova-app': cordovaAppStartCli
  // NOT SUPPORTED at this point:
  // 'cordova-plugin': cordovaPluginStartCli
}

const startMainCli = async () => {
  const notifier = updateNotifier({ pkg })

  notifier.notify()

  const { moduleType } = await prompt(startPromptQuestions)

  const start = startMap[moduleType]

  await start()
}

module.exports = startMainCli
