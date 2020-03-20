// *functional* component that can be rendered to a string by simple-xml-writer

const renderWithProperties = ({ name, description, id, version }) => e =>
  e('plugin', (e, a) => {
    a('id', id)
    a('version', version)
    e('name', name)
  })

module.exports = renderWithProperties
