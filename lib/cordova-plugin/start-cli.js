const getPromptQuestions = require('./get-prompt-questions')

const render = require('./render')

const withCopyrightYear = require('../common/with-copyright-year')

const output = require('../helpers/fs-tree-output')

const getPromptQuestionsForDemoApp = require('./demo-app/get-prompt-questions')

const renderDemoApp = require('./demo-app/render')

const prompt = require('../helpers/prompt')

async function start () {
  const questions = await getPromptQuestions()

  const response = await prompt(questions)

  const properties = withCopyrightYear(response)

  const outputTree = render(properties)

  await output(outputTree)

  const demoAppQuestions = getPromptQuestionsForDemoApp(properties)

  const demoAppProperties = await prompt(demoAppQuestions)

  const demoTree = renderDemoApp(demoAppProperties)

  await output(demoTree)
}

module.exports = start
