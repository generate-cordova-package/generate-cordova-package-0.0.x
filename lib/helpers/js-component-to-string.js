const types = require('@babel/types')

const generate = require('@babel/generator').default

function renderCode (component) {
  return generate(component(types)).code
}

module.exports = renderCode
