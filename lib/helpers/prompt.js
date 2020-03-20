const prompts = require('prompts')

function prompt (questions) {
  // quick adaptation to support questions originally designed for `inquirer`
  const promptQuestions = questions.map(opt => ({
    type: opt.type || 'text',
    initial: opt.default,
    ...opt
  }))

  return prompts(promptQuestions)
}

module.exports = prompt
