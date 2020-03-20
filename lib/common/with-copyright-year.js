// easily mockable in Jest:
const moment = require('moment')

const withCopyrightYear = properties => ({
  ...properties,
  copyrightYear: moment().year()
})

module.exports = withCopyrightYear
