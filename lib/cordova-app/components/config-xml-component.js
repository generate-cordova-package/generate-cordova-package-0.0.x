// *functional* component that can be rendered to a string by simple-xml-writer

const renderWithProperties = ({ name, description, id, version }) => e =>
  e('widget', (e, a) => {
    a('id', id)
    a('version', version)
    e('name', name)
    e('description', description)
  })

module.exports = renderWithProperties
