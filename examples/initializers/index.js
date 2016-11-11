//
// For convenience we grab all intializers and export
// them in one place.
//
// If you're not using React Native, you can dynamically
// grab everything that's under 'initializers/' and being
// explicit like below is not needed.
//
import initNavigation from './ex-navigation'
import initLogger from './redux-logger'
import initDevTools from './devtools'
import initPersist from './redux-persist'
import initMiddleware from './middleware'
import initReducers from './reducers'

export default [
  initLogger,
  initPersist,
  initNavigation,
  initMiddleware,
  initReducers,
  initDevTools,
]

