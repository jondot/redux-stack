# Redux stack

Redux Stack is a library that helps you build modular, structured, and cleaner redux apps.


As the Redux ecosystem grows, libraries integrate by
offering their own middleware, or enhancers, or even
custom `compose` and `createStore` functions. When each library require
a different way, or a "non standard" way to integrate with your Redux
store, reducers, and middleware, it's inevitable that something will
break, or at least for the code base to be rigid and not modular enough to scale.

Redux Stack introduces a concept of _initializers_. Small pieces of
integration code, per library, that "declares" how it integrates. Redux Stack will
mesh these together to create your personalized store builder.


## Quick Start

Create an `initializers` folder, and drop an initializer there. An initializer
is the main abstraction around Redux Stack, and it's responsibility is to
declare, for each integration, how to configure the store. To see how
the redux DevTools initializer looks like, for example, check out [this file](examples/initializers/devtools). We'll come back to initializers in a bit.

To create your store, you only need to pull the initializers and configure with redux-stack:

```javascript
import { createStore, combineReducers } from 'redux'
import { buildStack } from 'redux-stack'
import stack from './initializers'

const { reducers, enhancer } = buildStack(stack)
const store = createStore(combineReducers(reducers), {}, enhancer)

export default store
```

## Initializers

An initializer in Redux Stack, is a simple Javascript module that exports
the following shape:

```javascript
export default {
  reducers: {}
  enhancers: []
  composers: []
}
```

The `reducers`, `enhancers` (`applyMiddleware` is one example of an enhancer), and `composers` fields all contain one or
more of the standard redux [reducer](http://redux.js.org/docs/basics/Reducers.html),  [enhancer](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer)
and [composer](https://github.com/reactjs/redux/blob/master/docs/api/compose.md).

To learn how to make your own initializer, take a look at the example initializers in the [examples folder](examples/initializers), which
cover trivial and more complex configuration.

## Towards Redux Initializers and Presets

One goal is to have an extensive, pre-made set of initializers as part of redux-stack so people don't need to write them. For every well-known library you'll have a ready-made initializer that takes care of its configuration and integration into your Redux app.

So if you build a new initializer for a redux library, please feel free
to submit!

Another goal is to provide `presets`, which are sets of initializers,
or complete stacks for you to use. This idea is inspired from [babel presets](https://babeljs.io/docs/plugins/preset-latest/). So you could even do something like this:


```javascript
import { createStore, combineReducers } from 'redux'
import { buildStack } from 'redux-stack'
import stack from 'stack-react-native'

const { reducers, enhancer } = buildStack(stack)
const store = createStore(combineReducers(reducers), {}, enhancer)

export default store
```

## Example Store Setup

Here's how Redux Stack improves the way your code base feels, and supports
modularity.

### Before

```javascript
import users from '@/modules/users/state'
import settings from '@/modules/settings/state'
import intro from '@/modules/intro/state'
import { NavigationReducer, createNavigationEnabledStore } from '@exponent/ex-navigation'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import {AsyncStorage} from 'react-native'
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = {
  users,
  settings,
  intro,
}
const rootReducer = combineReducers({navigation: NavigationReducer, ...reducers})


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

let middleware = [
  thunk,
  logger
]

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
})

const initialState = {}

const store = createStoreWithNavigation(
  rootReducer,
  initialState,
  compose(
    autoRehydrate(),
    devtools(
      applyMiddleware(...middleware)
    )
  )
)

persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['navigation'],
  transforms: [immutableTransform()]
})

export default store
```

The setup code is convoluted. In addition imports and library usage are
separated and out of mind. It also means that if you ever want to change,
or remove components you'll have to hunt them out and hope you didn't break
your app; we see a lot of importance for how your order your integration.


### After

```javascript
import { createStore, combineReducers } from 'redux'
import { buildStack } from 'redux-stack'
import stack from '@/initializers'

const initialState = {}
const { reducers, enhancer } = buildStack(stack)
const store = createStore(combineReducers(reducers), initialState, enhancer)

export default store
```

Where we have a new `initializers` folder:

```
initializers/
├── devtools.js
├── ex-navigation.js
├── index.js
├── middleware.js
├── reducers.js
├── redux-logger.js
└── redux-persist.js
```

The setup code is a no brainer. It is clean and reasonable and probably will
look the same for every new app you make, so you can even extract that out
into an npm module.

The [initializers realm is separate and modular](examples/initializers/). You can remove and add any
initializer you like and be certain nothing will break. If you
built your app in a modular fashion, every module can "contribute" an initializer
which sets itself app, and no drama happens - no other code to change or module
to wreck by mistake.


# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).


### Thanks:

To all [Contributors](https://github.com/jondot/redux-stack/graphs/contributors) - you make this happen, thanks!


# Copyright

Copyright (c) 2016 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
