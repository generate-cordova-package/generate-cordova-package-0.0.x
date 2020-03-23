const DOCUMENT_IDENTIFIER = 'document'
const ADD_EVENT_LISTENER_KEY = 'addEventListener'
const DEVICEREADY_EVENT_ID = 'deviceready'
const GET_ELEMENT_KEY = 'getElementById'
const STATUS_DIV_ID = 'status'
const APPEND_CHILD_KEY = 'appendChild'
const CREATE_ELEMENT_KEY = 'createElement'

const CREATE_TEXT_NODE_KEY = 'createTextNode'
const READY_EMPHASIS_TAG = 'b'
const READY_TEXT = 'ready'

const PONG_EMPHASIS_TAG = 'i'
const PONG_TEXT = 'pong'

const WINDOW_IDENTIFIER = 'window'

const makeProgramWithStatements = t => (...statements) => t.program(statements)

const makeExpressionStatement = t => expression =>
  t.expressionStatement(expression)

const makeIdentifier = t => id => t.identifier(id)

const makeMemberExpression = t => (obj, memberIdentifier) =>
  t.memberExpression(obj, makeIdentifier(t)(memberIdentifier), false)

const makeCallExpression = t => (obj, ...args) => t.callExpression(obj, args)

const makeMemberFunctionCall = t => (obj, memberIdentifier, ...args) =>
  makeCallExpression(t)(makeMemberExpression(t)(obj, memberIdentifier), ...args)

const makeAnonymousCallbackFunctionWithBlockStatements = t => (...statements) =>
  t.functionExpression(null, [], t.blockStatement(statements))

const makeGlobalMemberExpression = t => (globalIdentifier, memberIdentifier) =>
  makeMemberExpression(t)(makeIdentifier(t)(globalIdentifier), memberIdentifier)

const makeGlobalMemberFunctionCall = t => (
  globalIdentifier,
  memberIdentifier,
  ...args
) =>
  makeCallExpression(t)(
    makeGlobalMemberExpression(t)(globalIdentifier, memberIdentifier),
    ...args
  )

const makeLiteralString = t => value => t.stringLiteral(value)

const demoAppComponent = properties => t =>
  makeProgramWithStatements(t)(
    makeExpressionStatement(t)(
      makeGlobalMemberFunctionCall(t)(
        DOCUMENT_IDENTIFIER,
        ADD_EVENT_LISTENER_KEY,
        makeLiteralString(t)(DEVICEREADY_EVENT_ID),
        makeAnonymousCallbackFunctionWithBlockStatements(t)(
          makeExpressionStatement(t)(
            makeMemberFunctionCall(t)(
              makeMemberFunctionCall(t)(
                makeGlobalMemberFunctionCall(t)(
                  DOCUMENT_IDENTIFIER,
                  GET_ELEMENT_KEY,
                  makeLiteralString(t)(STATUS_DIV_ID)
                ),
                APPEND_CHILD_KEY,
                makeGlobalMemberFunctionCall(t)(
                  DOCUMENT_IDENTIFIER,
                  CREATE_ELEMENT_KEY,
                  makeLiteralString(t)(READY_EMPHASIS_TAG)
                )
              ),
              APPEND_CHILD_KEY,
              makeGlobalMemberFunctionCall(t)(
                DOCUMENT_IDENTIFIER,
                CREATE_TEXT_NODE_KEY,
                makeLiteralString(t)(READY_TEXT)
              )
            )
          ),
          makeExpressionStatement(t)(
            makeMemberFunctionCall(t)(
              makeGlobalMemberExpression(t)(
                WINDOW_IDENTIFIER,
                properties.jsObjectName
              ),
              properties.jsFunctionName,
              makeAnonymousCallbackFunctionWithBlockStatements(t)(
                makeExpressionStatement(t)(
                  makeMemberFunctionCall(t)(
                    makeMemberFunctionCall(t)(
                      makeGlobalMemberFunctionCall(t)(
                        DOCUMENT_IDENTIFIER,
                        GET_ELEMENT_KEY,
                        makeLiteralString(t)(STATUS_DIV_ID)
                      ),
                      APPEND_CHILD_KEY,
                      makeGlobalMemberFunctionCall(t)(
                        DOCUMENT_IDENTIFIER,
                        CREATE_ELEMENT_KEY,
                        makeLiteralString(t)(PONG_EMPHASIS_TAG)
                      )
                    ),
                    APPEND_CHILD_KEY,
                    makeGlobalMemberFunctionCall(t)(
                      DOCUMENT_IDENTIFIER,
                      CREATE_TEXT_NODE_KEY,
                      makeLiteralString(t)(PONG_TEXT)
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )

module.exports = demoAppComponent
