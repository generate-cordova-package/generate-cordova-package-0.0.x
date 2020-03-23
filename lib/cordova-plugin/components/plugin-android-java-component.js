const copyrightLine = require('../../common/copyright-line')

const { COMMENT, DOT, NEWLINE, SPACE } = require('../../common/tokens')

const SEMICOLON_TOKEN = ';'

const PACKAGE_TOKEN = 'package'

const IMPORT_TOKEN = 'import'

const PUBLIC_TOKEN = 'public'

const CLASS_TOKEN = 'class'

const EXTENDS_TOKEN = 'extends'

const CORDOVA_PLUGIN_CLASS_NAME = 'CordovaPlugin'

const CBC_CLASS_NAME = 'CallbackContext'

const JSON_ARRAY_CLASS_NAME = 'JSONArray'

const LBRACE_TOKEN = '{'

const RBRACE_TOKEN = '}'

const SINGLE_INDENT_TOKEN = '  '

const ANNOTATION_TOKEN = '@'

const OVERRIDE_TOKEN = 'Override'

const BOOLEAN_TOKEN = 'boolean'

const LPAREN_TOKEN = '('

const RPAREN_TOKEN = ')'

const BLANK_TOKEN = ''

const EXECUTE_FUNCTION_NAME = 'execute'

const STRING_TOKEN = 'String'

const ACTION_PARAMETER_NAME = 'action'

const JSON_ARGS_PARAMETER_NAME = 'args'

const COMMA_TOKEN = ','

const CBC_PARAMETER_NAME = 'cbc'

const SWITCH_TOKEN = 'switch'

const CASE_TOKEN = 'case'

const COLON_TOKEN = ':'

const SUCCESS_MEMBER_NAME = 'success'

const QUOTE_TOKEN = '"'

const RETURN_TOKEN = 'return'

const TRUE_TOKEN = 'true'

const FALSE_TOKEN = 'false'

const makePackageName = (...parts) => [].concat(...parts).join(DOT)

const cordovaPackageName = makePackageName('org', 'apache', 'cordova')

const jsonPackageName = makePackageName('org', 'json')

const joinWithToken = (sep, ...tokens) => [].concat(...tokens).join(sep)

const joinTokens = (...tokens) => joinWithToken(BLANK_TOKEN, ...tokens)

const renderRenderLines = (...tokenLines) =>
  []
    .concat(tokenLines)
    .map(tokenLine => joinTokens(tokenLine))
    .join(NEWLINE)

const makeRenderLine = (...tokens) => [].concat(tokens)

const makePackageRenderLine = packageName => [
  PACKAGE_TOKEN,
  SPACE,
  packageName,
  SEMICOLON_TOKEN
]

const makeImportRenderLine = (packageName, className) =>
  makeRenderLine(
    IMPORT_TOKEN,
    SPACE,
    packageName,
    DOT,
    className,
    SEMICOLON_TOKEN
  )

const joinWithSpaces = (...parts) => joinWithToken(SPACE, ...parts)

const makeCommentRenderLine = comment =>
  makeRenderLine(joinTokens(COMMENT, SPACE, joinTokens(comment)))

const makeRenderLinesWithIndent = (indent, ...renderLines) =>
  [].concat(...renderLines).map(renderLine => joinTokens(indent, ...renderLine))

const makePublicClassRenderLines = (
  className,
  baseClassName,
  ...classBodyLines
) => [
  makeRenderLine(
    joinWithSpaces(
      PUBLIC_TOKEN,
      CLASS_TOKEN,
      className,
      EXTENDS_TOKEN,
      baseClassName,
      makeRenderLine(LBRACE_TOKEN)
    )
  ),
  ...makeRenderLinesWithIndent(
    SINGLE_INDENT_TOKEN,
    [].concat(...classBodyLines)
  ),
  makeRenderLine(RBRACE_TOKEN)
]

const makePublicOverrideFunctionRenderLines = (
  returnTypeName,
  functionName,
  parameters,
  ...bodyLines
) => [
  makeRenderLine(
    joinTokens(ANNOTATION_TOKEN, OVERRIDE_TOKEN),
    joinWithSpaces(
      PUBLIC_TOKEN,
      returnTypeName,
      joinTokens(
        functionName,
        LPAREN_TOKEN,
        joinWithToken(joinTokens(COMMA_TOKEN, SPACE), parameters),
        RPAREN_TOKEN
      ),
      makeRenderLine(LBRACE_TOKEN)
    )
  ),
  ...makeRenderLinesWithIndent(SINGLE_INDENT_TOKEN, [].concat(...bodyLines)),
  makeRenderLine(RBRACE_TOKEN)
]

const makeSwitchRenderLines = (expression, ...bodyLines) => [
  makeRenderLine(
    joinWithSpaces(
      SWITCH_TOKEN,
      joinTokens(LPAREN_TOKEN, expression, RPAREN_TOKEN),
      LBRACE_TOKEN
    )
  ),
  ...makeRenderLinesWithIndent(SINGLE_INDENT_TOKEN, [].concat(...bodyLines)),
  makeRenderLine(RBRACE_TOKEN)
]

const makeCaseRenderLines = (expression, ...bodyLines) => [
  makeRenderLine(
    joinWithSpaces(CASE_TOKEN, joinTokens(expression, COLON_TOKEN))
  ),
  ...makeRenderLinesWithIndent(SINGLE_INDENT_TOKEN, [].concat(...bodyLines))
]

const makeFunctionCallRenderLines = (call, args) => [
  makeRenderLine(
    joinTokens(call, LPAREN_TOKEN, args, RPAREN_TOKEN, SEMICOLON_TOKEN)
  )
]

const makeStringLiteral = value => joinTokens([QUOTE_TOKEN, value, QUOTE_TOKEN])

const makeReturnStatementRenderLine = value =>
  joinTokens(RETURN_TOKEN, SPACE, value, SEMICOLON_TOKEN)

function render (properties) {
  return renderRenderLines(
    makeCommentRenderLine(copyrightLine(properties)),
    makeRenderLine(),
    makePackageRenderLine(properties.androidPackageName),
    makeRenderLine(),
    makeImportRenderLine(cordovaPackageName, CORDOVA_PLUGIN_CLASS_NAME),
    makeImportRenderLine(cordovaPackageName, CBC_CLASS_NAME),
    makeRenderLine(),
    makeImportRenderLine(jsonPackageName, JSON_ARRAY_CLASS_NAME),
    makeRenderLine(),
    ...makePublicClassRenderLines(
      properties.nativeObjectName,
      CORDOVA_PLUGIN_CLASS_NAME,
      ...makePublicOverrideFunctionRenderLines(
        BOOLEAN_TOKEN,
        EXECUTE_FUNCTION_NAME,
        [
          joinWithSpaces(STRING_TOKEN, ACTION_PARAMETER_NAME),
          joinWithSpaces(JSON_ARRAY_CLASS_NAME, JSON_ARGS_PARAMETER_NAME),
          joinWithSpaces(CBC_CLASS_NAME, CBC_PARAMETER_NAME)
        ],
        ...makeRenderLinesWithIndent(SINGLE_INDENT_TOKEN),
        ...makeSwitchRenderLines(ACTION_PARAMETER_NAME, [
          ...makeCaseRenderLines(
            makeStringLiteral(properties.nativeFunctionName),
            [
              makeFunctionCallRenderLines(
                joinWithToken(DOT, CBC_PARAMETER_NAME, SUCCESS_MEMBER_NAME),
                JSON_ARGS_PARAMETER_NAME
              )
            ]
          ),
          makeReturnStatementRenderLine(TRUE_TOKEN)
        ]),
        makeReturnStatementRenderLine(FALSE_TOKEN)
      )
    )
  )
}

module.exports = render
