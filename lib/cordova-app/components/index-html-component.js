// *functional* component that can be rendered to a string by simple-xml-writer

const renderWithProperties = ({ name, description, id, version }) => e =>
  e('html', e => {
    e('header', e => {
      // link element generated with trailing slash
      // which is proper for xhtml ref:
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
      e('link', (e, a) => {
        a('rel', 'stylesheet')
        a('href', 'body.css')
      })
    })
    e('body', e => {
      e('h1', name)
      e('div', (e, a) => {
        a('id', 'status')
      })
      e('script', (e, a, t) => {
        a('src', 'cordova.js')
        t('')
      })
      e('script', (e, a, t) => {
        a('src', 'app.js')
        t('')
      })
    })
  })

module.exports = renderWithProperties
