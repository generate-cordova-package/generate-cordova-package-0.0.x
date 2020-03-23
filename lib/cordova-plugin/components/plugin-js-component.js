const {
  CALLBACK_IDENTIFIER,
  CORDOVA_OBJECT_NAME,
  CORDOVA_OBJECT_EXEC_MEMBER_NAME,
  NULL_OBJECT_IDENTIFIER,
  PONG_IDENTIFIER,
  WINDOW_IDENTIFIER
} = require('../tokens/plugin-js-tokens')

const { ASSIGNMENT_OPERATOR_TOKEN } = require('../tokens/plugin-common-tokens')

const makeProgram = t => statements => t.program(statements)

const makeFunctionWithParamsAndBlockStatements = t => (
  functionName,
  params,
  statements
) =>
  t.functionDeclaration(
    t.identifier(functionName),
    params && params.map(param => t.Identifier(param)),
    t.blockStatement(statements)
  )

const makeAnonymousCallbackFunctionWithBlockStatements = t => statements =>
  t.functionExpression(null, [], t.blockStatement(statements))

const makeExpressionStatement = t => expression =>
  t.expressionStatement(expression)

const makeIdentifierCallExpression = t => (identifier, args) =>
  t.callExpression(t.identifier(identifier), args)

const makeLiteralString = t => value => t.stringLiteral(value)

const makeIdentifier = t => identifier => t.identifier(identifier)

const makeGlobalMemberFunctionCall = t => (
  globalIdentifier,
  memberIdentifier,
  args
) =>
  t.callExpression(
    t.memberExpression(
      t.identifier(globalIdentifier),
      t.identifier(memberIdentifier),
      false
    ),
    args
  )

const makeMemberAssignmentExpressionStatement = t => (
  lhs,
  memberIdentifier,
  rhs
) =>
  makeExpressionStatement(t)(
    t.assignmentExpression(
      ASSIGNMENT_OPERATOR_TOKEN,
      t.memberExpression(lhs, t.identifier(memberIdentifier), false),
      rhs
    )
  )

const makeObjectProperty = t => (identifier, value) =>
  t.objectProperty(t.identifier(identifier), value)

const makeObjectExpression = t => members => t.objectExpression(members)

const pluginJsComponent = properties => t =>
  makeProgram(t)([
    makeFunctionWithParamsAndBlockStatements(t)(
      properties.jsFunctionName,
      [CALLBACK_IDENTIFIER],
      [
        makeExpressionStatement(t)(
          makeGlobalMemberFunctionCall(t)(
            CORDOVA_OBJECT_NAME,
            CORDOVA_OBJECT_EXEC_MEMBER_NAME,
            [
              makeAnonymousCallbackFunctionWithBlockStatements(t)([
                makeExpressionStatement(t)(
                  makeIdentifierCallExpression(t)(CALLBACK_IDENTIFIER, [
                    makeLiteralString(t)(PONG_IDENTIFIER)
                  ])
                )
              ]),
              makeIdentifier(t)(NULL_OBJECT_IDENTIFIER),
              makeLiteralString(t)(properties.nativeObjectName),
              makeLiteralString(t)(properties.nativeFunctionName),
              makeIdentifier(t)(NULL_OBJECT_IDENTIFIER)
            ]
          )
        )
      ]
    ),
    makeMemberAssignmentExpressionStatement(t)(
      makeIdentifier(t)(WINDOW_IDENTIFIER),
      properties.jsObjectName,
      makeObjectExpression(t)([
        makeObjectProperty(t)(
          properties.jsFunctionName,
          makeIdentifier(t)(properties.jsFunctionName)
        )
      ])
    )
  ])

module.exports = pluginJsComponent
