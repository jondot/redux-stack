import R from 'ramda'
import { compose } from 'redux'

// TODO: stack formatter + printer dump at build time, etc.

// composition for arrays, hashes, and functions
const mergeStack = R.reduce(R.mergeWith((a, b) =>
    R.isArrayLike(a) && R.isArrayLike(b) ?
      R.concat(a, b)
      : (typeof a === 'function' && typeof b === 'function' ? compose(a, b) : R.merge(a, b))), [])

const combineStack = (userStack, initial) => mergeStack(R.concat(
    R.map(({reducers = [], enhancers = [], composers = []}) => ({reducers, enhancers, composers}), userStack),
    [initial]
))

const buildStack = (userStack = [], initial = { reducers: {}, enhancers: [], composers: [compose] }) => {
  const combinedStack = combineStack(userStack, initial)
  const stackCompose = combinedStack.composers && combinedStack.composers.length > 0 ? compose(...combinedStack.composers) : compose // inception!
  const stack = { reducers: combinedStack.reducers, enhancer: stackCompose(...combinedStack.enhancers), meta: userStack }
  return stack
}

export { buildStack }
