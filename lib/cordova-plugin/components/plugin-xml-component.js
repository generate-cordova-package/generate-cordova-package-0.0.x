// *functional* component that can be rendered to a string by simple-xml-writer

const renderWithProperties = ({
  name,
  description,
  id,
  version,
  jsModuleName,
  jsObjectName
}) => e =>
  e('plugin', (e, a) => {
    a('id', id)
    a('version', version)
    e('name', name)
    e('js-module', (e, a) => {
      a('src', `www/${jsModuleName}.js`)
      a('name', jsObjectName)
      // simple plugin js module startup
      e('runs', '')
    })
  })

module.exports = renderWithProperties
