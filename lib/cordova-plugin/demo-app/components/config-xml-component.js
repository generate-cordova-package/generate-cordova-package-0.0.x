// *functional* component that can be rendered to a string by simple-xml-writer

const renderWithProperties = ({ demoAppName, description, id, version }) => e =>
  // top-level widget element:
  e('widget', (e, a) => {
    // widget attributes:
    a('id', id)
    a('version', version)

    // widget sub-element(s):
    e('name', demoAppName)
    e('description', description)
  })

module.exports = renderWithProperties
