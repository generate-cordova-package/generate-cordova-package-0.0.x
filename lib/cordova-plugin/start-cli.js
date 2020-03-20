const getPromptQuestions = require('./get-prompt-questions')

const render = require('./render')

const withCopyrightYear = require('../common/with-copyright-year')

const output = require('../helpers/fs-tree-output')

const prompt = require('../helpers/prompt')

async function start () {
  const questions = await getPromptQuestions()

  const response = await prompt(questions)

  const properties = withCopyrightYear(response)

  const outputTree = await render(properties)

  await output(outputTree)
}

module.exports = start
