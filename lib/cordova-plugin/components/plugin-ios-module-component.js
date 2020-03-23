const copyrightLine = require('../../common/copyright-line')

const { COMMENT, DOT, NEWLINE, SPACE } = require('../../common/tokens')

const SEMICOLON_TOKEN = ';'

const HASH_TOKEN = '#'

const IMPORT_TOKEN = 'import'

const LITOKEN = '<'
const RITOKEN = '>'

const CORDOVA_IMPORT_PREFIX = 'Cordova'
const CORDOVA_IMPORT_SEP = '/'
const CDVPLUGIN_IMPORT_NAME = 'CDVPlugin.h'

const ATOKEN = '@'

const INTERFACE_TOKEN = 'interface'

const CORDOVA_PLUGIN_BASE_CLASS_NAME = 'CDVPlugin'

const CORDOVA_INVOKED_COMMAND_CLASS_NAME = 'CDVInvokedUrlCommand'

const METHODTOKEN = '-'

const VOID_TOKEN = 'void'

const STAR_TOKEN = '*'

const COMMAND_PARAMTER_NAME = 'command'

const END_TOKEN = 'end'

const IMPLEMENTATION_TOKEN = 'implementation'

const LBRACE_TOKEN = '{'

const RBRACE_TOKEN = '}'

const SINGLE_INDENT_TOKEN = '  '

const LPAREN_TOKEN = '('

const RPAREN_TOKEN = ')'

const BLANK_TOKEN = ''

const COLON_TOKEN = ':'

const ASSIGN_TOKEN = '='

const LBRACKET_TOKEN = '['
const RBRACKET_TOKEN = ']'

const ARGUMENTS_MEMBER_NAME = 'arguments'

const PLUGIN_RESULT_CLASS_NAME = 'CDVPluginResult'

const RESULT_NAME = 'result'

const RESULT_WITH_STATUS_SELECTOR = 'resultWithStatus'

const COMMAND_STATUS_OK_TOKEN = 'CDVCommandStatus_OK'

const MESSAGE_AS_ARRAY_SELECTOR = 'messageAsArray'

const SELF_TOKEN = 'self'

const COMMAND_DELEGATE_MEMBER = 'commandDelegate'

const SEND_PLUGIN_RESULT_SELECTOR = 'sendPluginResult'

const CALLBACK_ID_SELECTOR = 'callbackId'

const COMMAND_CALLBACK_ID_MEMBER = 'callbackId'

const joinWithToken = (sep, ...tokens) => [].concat(...tokens).join(sep)

const joinTokens = (...tokens) => joinWithToken(BLANK_TOKEN, ...tokens)

const renderRenderLines = (...tokenLines) =>
  []
    .concat(tokenLines)
    .map(tokenLine => joinTokens(tokenLine))
    .join(NEWLINE)

const makeRenderLine = (...tokens) => [].concat(tokens)

const makeImportRenderLine = importName => [
  HASH_TOKEN,
  IMPORT_TOKEN,
  SPACE,
  LITOKEN,
  importName,
  RITOKEN
]

const joinWithSpaces = (...parts) => joinWithToken(SPACE, ...parts)

const makeCommentRenderLine = comment =>
  makeRenderLine(joinTokens(COMMENT, SPACE, joinTokens(comment)))

const makeRenderLinesWithIndent = (indent, ...renderLines) =>
  [].concat(...renderLines).map(renderLine => joinTokens(indent, ...renderLine))

const makeDerivedInterfaceRenderLines = (
  className,
  baseClassName,
  ...bodyLines
) => [
  makeRenderLine(
    joinWithSpaces(
      joinTokens(ATOKEN, INTERFACE_TOKEN),
      className,
      COLON_TOKEN,
      baseClassName
    )
  ),
  makeRenderLine(),
  ...bodyLines,
  makeRenderLine(),
  makeRenderLine(joinTokens(ATOKEN, END_TOKEN))
]

const makeInterfaceMethodLine = (returnType, methodName, parameters) =>
  joinTokens(
    joinWithSpaces(
      METHODTOKEN,
      joinTokens(LPAREN_TOKEN, returnType, RPAREN_TOKEN),
      methodName,
      parameters
    ),
    SEMICOLON_TOKEN
  )

const makeClassReferenceType = className =>
  joinWithSpaces(className, STAR_TOKEN)

const makeClassReferenceParameterType = className =>
  joinTokens(LPAREN_TOKEN, joinWithSpaces(className, STAR_TOKEN), RPAREN_TOKEN)

const makeMethodClassReferenceParameter = (className, parameterName) =>
  joinWithSpaces(
    COLON_TOKEN,
    makeClassReferenceParameterType(className),
    parameterName
  )

const makeImplementationRenderLines = (className, ...bodyLines) => [
  makeRenderLine(
    joinWithSpaces(joinTokens(ATOKEN, IMPLEMENTATION_TOKEN), className)
  ),
  makeRenderLine(),
  ...bodyLines,
  makeRenderLine(),
  makeRenderLine(joinTokens(ATOKEN, END_TOKEN))
]

const makeImplementationMethodLines = (
  returnType,
  methodName,
  parameters,
  ...methodBodyLines
) => [
  joinTokens(
    joinWithSpaces(
      METHODTOKEN,
      joinTokens(LPAREN_TOKEN, returnType, RPAREN_TOKEN),
      methodName,
      parameters
    )
  ),
  makeRenderLine(LBRACE_TOKEN),
  ...makeRenderLinesWithIndent(
    SINGLE_INDENT_TOKEN,
    [].concat(...methodBodyLines)
  ),
  makeRenderLine(RBRACE_TOKEN)
]

const makeInitializedVariableLine = (type, name, value) =>
  joinTokens(joinWithSpaces(type, name, ASSIGN_TOKEN, value), SEMICOLON_TOKEN)

const makeSelectorCall = (obj, ...selectorParts) =>
  joinTokens(
    LBRACKET_TOKEN,
    joinWithSpaces(obj, ...selectorParts),
    RBRACKET_TOKEN,
    SEMICOLON_TOKEN
  )

const makeMemberReference = (l, r) => joinTokens(l, DOT, r)

const makeSelectorPart = (l, r) => joinTokens(l, COLON_TOKEN, r)

function render (properties) {
  return renderRenderLines(
    makeCommentRenderLine(copyrightLine(properties)),
    makeRenderLine(),
    makeImportRenderLine(
      joinWithToken(
        CORDOVA_IMPORT_SEP,
        CORDOVA_IMPORT_PREFIX,
        CDVPLUGIN_IMPORT_NAME
      )
    ),
    makeRenderLine(),
    ...makeDerivedInterfaceRenderLines(
      properties.nativeObjectName,
      CORDOVA_PLUGIN_BASE_CLASS_NAME,
      makeInterfaceMethodLine(
        VOID_TOKEN,
        properties.nativeFunctionName,
        makeMethodClassReferenceParameter(
          CORDOVA_INVOKED_COMMAND_CLASS_NAME,
          COMMAND_PARAMTER_NAME
        )
      )
    ),
    makeRenderLine(),
    ...makeImplementationRenderLines(
      properties.nativeObjectName,
      ...makeImplementationMethodLines(
        VOID_TOKEN,
        properties.nativeFunctionName,
        makeMethodClassReferenceParameter(
          CORDOVA_INVOKED_COMMAND_CLASS_NAME,
          COMMAND_PARAMTER_NAME
        ),
        [
          makeInitializedVariableLine(
            makeClassReferenceType(PLUGIN_RESULT_CLASS_NAME),
            RESULT_NAME,
            makeSelectorCall(
              PLUGIN_RESULT_CLASS_NAME,
              makeSelectorPart(
                RESULT_WITH_STATUS_SELECTOR,
                COMMAND_STATUS_OK_TOKEN
              ),
              makeSelectorPart(
                MESSAGE_AS_ARRAY_SELECTOR,
                makeMemberReference(
                  COMMAND_PARAMTER_NAME,
                  ARGUMENTS_MEMBER_NAME
                )
              )
            )
          ),
          makeSelectorCall(
            makeMemberReference(SELF_TOKEN, COMMAND_DELEGATE_MEMBER),
            makeSelectorPart(SEND_PLUGIN_RESULT_SELECTOR, RESULT_NAME),
            makeSelectorPart(
              CALLBACK_ID_SELECTOR,
              makeMemberReference(
                COMMAND_PARAMTER_NAME,
                COMMAND_CALLBACK_ID_MEMBER
              )
            )
          )
        ]
      )
    ),

    // adds final newline:
    makeRenderLine()
  )
}

module.exports = render
