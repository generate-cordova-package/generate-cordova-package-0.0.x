const { format } = require('simple-json-formatter')

function render (jsonObject) {
  // stringify & format, with quick indentation fix
  return format(JSON.stringify(jsonObject)).replace(/\t/g, '  ')
}

module.exports = render
