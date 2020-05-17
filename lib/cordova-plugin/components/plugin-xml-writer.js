const XMLWriter = require('xml-writer')

const { XML_INDENT } = require('../../common/tokens')

const {
  JAVASCRIPT_EXTENSION,
  WWW_DIRECTORY_NAME
} = require('../../common/tokens')

const {
  joinWithDot,
  joinWithSlash,
  joinTogether
} = require('../../helpers/join-text')

const PLUGIN_ROOT_TAG = 'plugin'
const PLUGIN_JS_MODULE_TAG = 'js-module'
const PLUGIN_JS_MODULE_RUNS_TAG = 'runs'
// TODO:
// const PLUGIN_PLATFORM_TAG = 'platform'
// const PLUGIN_PLATFORM_CONFIG_FILE_TAG = 'config-file'

const PLUGIN_ID_ATTRIBUTE = 'id'
const PLUGIN_VERSION_ATTRIBUTE = 'version'
const PLUGIN_JS_MODULE_SRC_ATTRIBUTE = 'src'
const PLUGIN_JS_MODULE_NAME_ATTRIBUTE = 'name'
// TODO:
// const PLUGIN_PLATFORM_NAME_ATTRIBUTE = 'name'
// const PLUGIN_PLATFORM_CONFIG_TARGET_ATTRIBUTE = 'target'
// const PLUGIN_PLATFORM_CONFIG_PARENT_ATTRIBUTE = 'parent'

// TODO:
// const PLUGIN_PLATFORM_CONFIG_FILE_TARGET_NAME = 'config.xml'
// const PLUGIN_PLATFORM_CONFIG_FILE_PARENT_NAME = '/*'

function pluginXmlWriter (properties) {
  const xw = new XMLWriter(XML_INDENT)
  xw.startElement(PLUGIN_ROOT_TAG)
    .writeAttribute(PLUGIN_ID_ATTRIBUTE, properties.id)
    .writeAttribute(PLUGIN_VERSION_ATTRIBUTE, properties.version)
    .startElement(PLUGIN_JS_MODULE_TAG)
    .writeAttribute(
      PLUGIN_JS_MODULE_SRC_ATTRIBUTE,
      joinTogether(
        joinWithSlash(
          WWW_DIRECTORY_NAME,
          joinWithDot(properties.jsModuleName, JAVASCRIPT_EXTENSION)
        )
      )
    )
    .writeAttribute(PLUGIN_JS_MODULE_NAME_ATTRIBUTE, properties.jsObjectName)
    .startElement(PLUGIN_JS_MODULE_RUNS_TAG)
    .endElement()

  return xw
}

module.exports = pluginXmlWriter
