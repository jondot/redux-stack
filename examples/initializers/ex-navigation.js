//
// Exponent's navigation component. It requires more than
// the usual for set up and this is a perfect example for
// how redux-stack can simplify it.
//
// SEE:
// https://github.com/exponentjs/ex-navigation
//
import { NavigationReducer, createNavigationEnabledStore } from '@exponent/ex-navigation'

const navEnhancer = (createStoreFn) => {
  return createNavigationEnabledStore({
    createStore: createStoreFn,
    navigationStateKey: 'navigation',
  })
}

export default {
  name: 'ex-navigation',
  reducers: {navigation: NavigationReducer},
  enhancers: [navEnhancer],
}
