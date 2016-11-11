//
// Add async middleware, and other "core" middleware that
// you choose to. `applyMiddleware` creates an enhancer,
// so we can export that under `enhancers`.
//
// SEE
// https://github.com/gaearon/redux-thunk
// https://github.com/pburtchaell/redux-promise-middleware
//
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxPromiseMiddleware from 'redux-promise-middleware'

const middleware = [
  reduxPromiseMiddleware(),
  thunk,
]

export default {
  name: 'middleware',
  enhancers: [applyMiddleware(...middleware)],
}
