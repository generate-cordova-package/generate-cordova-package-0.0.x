// *functional* component that can be rendered to a string by simple-xml-writer

const renderWithProperties = ({ name, description, id, version }) => e =>
  e('html', e => {
    e('body', e => {
      e('h1', name)
      e('div', (e, a) => {
        a('id', 'status')
      })
      e('script', (e, a, t) => {
        a('src', 'cordova.js')
        t('')
      })
    })
  })

module.exports = renderWithProperties
