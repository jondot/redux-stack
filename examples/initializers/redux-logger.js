//
// Set up redux-logger, and take into account that our
// reducers use immutablejs.
//
// SEE
// https://github.com/evgenyrodionov/redux-logger
//
declare var __DEV__:any

import createLogger from 'redux-logger'
import {fromJS} from 'immutable'
import { applyMiddleware } from 'redux'

// log actions in development mode
const removeNavigation = (state) => {
  delete state.navigation
  return state
}
const logger = createLogger({
  collapsed: true,
  // only log in development mode
  predicate: () => __DEV__,
  // transform immutable state to plain objects
  stateTransformer: state => removeNavigation(fromJS(state).toJS()),
  // transform immutable action payloads to plain objects
  actionTransformer: action =>
    action && action.payload && action.payload.toJS
      ? {...action, payload: action.payload.toJS()}
      : action
})

export default {
  enhancers: __DEV__ ? [applyMiddleware(logger)] : []
}
