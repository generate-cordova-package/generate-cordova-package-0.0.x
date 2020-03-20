const prompts = require('prompts')

// with quick adaptations:
// - support questions originally designed for `inquirer`
// - semi-graceful cancellation
//   (should be supported by npm package in the future)
async function prompt (questions) {
  // support questions originally designed for `inquirer`
  // (...)
  const promptQuestions = questions.map(opt => ({
    type: opt.type || 'text',
    initial: opt.default,
    ...opt
  }))

  // semi-graceful cancellation
  // (...)
  let isCancelled = false
  return prompts(promptQuestions, {
    onCancel: () => {
      isCancelled = true
    }
  }).then(properties => {
    // stop with an exception if cancelled with Control-C:
    if (isCancelled) throw new Error('cancelled by user')

    // otherwise continue with the entered values:
    return Promise.resolve(properties)
  })
}

module.exports = prompt
