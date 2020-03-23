// *functional* component that can be rendered to a string by simple-xml-writer

const {
  joinWithDot,
  joinWithSlash,
  joinTogether
} = require('../../helpers/join-text')

const {
  ID_TAG,
  JS_MODULE_NAME_TAG,
  JS_MODULE_TAG,
  PLATFORM_CONFIG_FEATURE_NAME_TAG,
  PLATFORM_CONFIG_FEATURE_PARAM_NAME_TAG,
  PLATFORM_CONFIG_FEATURE_PARAM_VALUE_TAG,
  PLATFORM_CONFIG_FEATURE_PARAM_TAG,
  PLATFORM_CONFIG_FEATURE_TAG,
  PLATFORM_CONFIG_FILE_TAG,
  PLATFORM_CONFIG_FILE_TARGET_TAG,
  PLATFORM_CONFIG_PARENT_TAG,
  PLATFORM_CONFIG_PARENT_VALUE,
  PLATFORM_NAME_TAG,
  PLATFORM_SOURCE_FILE_TAG,
  PLATFORM_SOURCE_FILE_SRC_TAG,
  PLATFORM_SOURCE_FILE_TARGET_DIR_TAG,
  PLATFORM_TAG,
  RUNS_TAG,
  SRC_TAG,
  TOP_PLUGIN_TAG,
  VERSION_TAG
} = require('../tokens/plugin-xml-tokens')

const {
  CORDOVA_ANDROID_PLATFORM_NAME,
  CORDOVA_IOS_PLATFORM_NAME,
  CORDOVA_MAC_OSX_PLATFORM_NAME
} = require('../tokens/plugin-common-tokens')

const {
  BLANK,
  DASH,
  JAVASCRIPT_EXTENSION,
  WWW_DIRECTORY_NAME
} = require('../../common/tokens')

const PLATFORM_CONFIG_FILE_NAME = 'config.xml'

const PACKAGE_SUFFIX = joinTogether(DASH, 'package')

const PLATFORM_CONFIG_FEATURE_ANDROID_PACKAGE = joinTogether(
  CORDOVA_ANDROID_PLATFORM_NAME,
  PACKAGE_SUFFIX
)

const PLATFORM_CONFIG_FEATURE_IOS_PACKAGE = joinTogether(
  CORDOVA_IOS_PLATFORM_NAME,
  PACKAGE_SUFFIX
)

const PLATFORM_CONFIG_FEATURE_MAC_OSX_PACKAGE = joinTogether(
  CORDOVA_MAC_OSX_PLATFORM_NAME,
  PACKAGE_SUFFIX
)

const renderWithProperties = ({
  description,
  id,
  version,
  jsModuleName,
  jsObjectName,
  androidPackageName,
  nativeObjectName
}) => e =>
  // top-level plugin element:
  e(TOP_PLUGIN_TAG, (e, a) => {
    // plugin attributes:
    a(ID_TAG, id)
    a(VERSION_TAG, version)

    // plugin sub-element(s):

    // js-module for Android:
    e(JS_MODULE_TAG, (e, a) => {
      // js-module attributes:
      a(
        SRC_TAG,
        joinTogether(
          joinWithSlash(
            WWW_DIRECTORY_NAME,
            joinWithDot(jsModuleName, JAVASCRIPT_EXTENSION)
          )
        )
      )
      a(JS_MODULE_NAME_TAG, jsObjectName)

      // js-module sub-element
      // (for simple plugin js module startup):
      e(RUNS_TAG, BLANK)
    })

    // js-module for iOS:
    e(PLATFORM_TAG, (e, a) => {
      // platform attribute(s):
      a(PLATFORM_NAME_TAG, CORDOVA_ANDROID_PLATFORM_NAME)

      // platform sub-element(s)
      e(PLATFORM_CONFIG_FILE_TAG, (e, a) => {
        a(PLATFORM_CONFIG_FILE_TARGET_TAG, PLATFORM_CONFIG_FILE_NAME)
        a(PLATFORM_CONFIG_PARENT_TAG, PLATFORM_CONFIG_PARENT_VALUE)
        e(PLATFORM_CONFIG_FEATURE_TAG, (e, a) => {
          // feature attribute(s):
          a(PLATFORM_CONFIG_FEATURE_NAME_TAG, nativeObjectName)

          // feature sub-element(s)
          e(PLATFORM_CONFIG_FEATURE_PARAM_TAG, (e, a) => {
            // param attribute(s):
            a(
              PLATFORM_CONFIG_FEATURE_PARAM_NAME_TAG,
              PLATFORM_CONFIG_FEATURE_ANDROID_PACKAGE
            )
            a(
              PLATFORM_CONFIG_FEATURE_PARAM_VALUE_TAG,
              joinWithDot(androidPackageName, nativeObjectName)
            )
          })
        })
      })

      e(PLATFORM_SOURCE_FILE_TAG, (e, a) => {
        // source-file attribute(s):
        a(
          PLATFORM_SOURCE_FILE_SRC_TAG,
          ['src', 'android', [nativeObjectName, 'java'].join('.')].join('/')
        )
        a(
          PLATFORM_SOURCE_FILE_TARGET_DIR_TAG,
          []
            .concat('src')
            .concat(androidPackageName.split('.'))
            .join('/')
        )
      })
    })

    // js-module for macOS ("osx"):
    e(PLATFORM_TAG, (e, a) => {
      // platform attribute(s):
      a(PLATFORM_NAME_TAG, CORDOVA_IOS_PLATFORM_NAME)

      // platform sub-element(s)
      e(PLATFORM_CONFIG_FILE_TAG, (e, a) => {
        a(PLATFORM_CONFIG_FILE_TARGET_TAG, PLATFORM_CONFIG_FILE_NAME)
        a(PLATFORM_CONFIG_PARENT_TAG, PLATFORM_CONFIG_PARENT_VALUE)
        e(PLATFORM_CONFIG_FEATURE_TAG, (e, a) => {
          // feature attribute(s):
          a(PLATFORM_CONFIG_FEATURE_NAME_TAG, nativeObjectName)

          // feature sub-element(s)
          e(PLATFORM_CONFIG_FEATURE_PARAM_TAG, (e, a) => {
            // param attribute(s):
            a(
              PLATFORM_CONFIG_FEATURE_PARAM_NAME_TAG,
              PLATFORM_CONFIG_FEATURE_IOS_PACKAGE
            )
            a(PLATFORM_CONFIG_FEATURE_PARAM_VALUE_TAG, nativeObjectName)
          })
        })
      })

      e(PLATFORM_SOURCE_FILE_TAG, (e, a) => {
        a('src', ['src', 'ios', [nativeObjectName, 'm'].join('.')].join('/'))
      })
    })

    e(PLATFORM_TAG, (e, a) => {
      // platform attribute(s):
      a(PLATFORM_NAME_TAG, CORDOVA_MAC_OSX_PLATFORM_NAME)

      // platform sub-element(s)
      e(PLATFORM_CONFIG_FILE_TAG, (e, a) => {
        a(PLATFORM_CONFIG_FILE_TARGET_TAG, PLATFORM_CONFIG_FILE_NAME)
        a(PLATFORM_CONFIG_PARENT_TAG, PLATFORM_CONFIG_PARENT_VALUE)
        e(PLATFORM_CONFIG_FEATURE_TAG, (e, a) => {
          // feature attribute(s):
          a(PLATFORM_CONFIG_FEATURE_NAME_TAG, nativeObjectName)

          // feature sub-element(s)
          e(PLATFORM_CONFIG_FEATURE_PARAM_TAG, (e, a) => {
            // param attribute(s):
            a(
              PLATFORM_CONFIG_FEATURE_PARAM_NAME_TAG,
              PLATFORM_CONFIG_FEATURE_MAC_OSX_PACKAGE
            )
            a(PLATFORM_CONFIG_FEATURE_PARAM_VALUE_TAG, nativeObjectName)
          })
        })
      })

      e(PLATFORM_SOURCE_FILE_TAG, (e, a) => {
        a('src', ['src', 'ios', [nativeObjectName, 'm'].join('.')].join('/'))
      })
    })
  })

module.exports = renderWithProperties
