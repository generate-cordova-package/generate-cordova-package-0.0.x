const prettierx = require('prettierx')

const prettierxStandardFormatOptions = {
  // explicit parser to avoid an ugly warning message
  parser: 'babel',
  // "Standard-like" formatting:
  semi: false,
  singleQuote: true,
  spaceBeforeFunctionParen: true
}

const prettierxStandardFormat = source =>
  prettierx.format(source, prettierxStandardFormatOptions)

module.exports = prettierxStandardFormat
