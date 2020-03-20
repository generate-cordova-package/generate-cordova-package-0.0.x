// easily mockable with Jest:
const gitconfig = require('gitconfig')

async function getAuthorDefaults () {
  // get gitconfig info needed to help with the correct
  // author name & email defaults
  const global = await gitconfig.get({ location: 'global' })

  return {
    authorName: global.user.name,
    authorEmail: global.user.email
  }
}

module.exports = getAuthorDefaults
