//
// Set up redux-persist with immutable transform, under React Native
// Again we have a perfect example where there is a lot of boilerplate
// code that has nothing to do with our app. If we ever want to remove
// immutablejs, we can just do it here.
//
// SEE
// https://github.com/rt2zz/redux-persist
//
import {AsyncStorage} from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'

const createStoreWithPersist = createStoreFn => (...args) => {
  const store = createStoreFn(...args)
  persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['navigation'],
    transforms: [immutableTransform()]
  }).purge()
  return store
}

export default {
  enhancers: [autoRehydrate(), createStoreWithPersist]
}
