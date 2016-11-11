//
// react-native-debugger devtools, which rely on the normal
// redux devtools.
//
// Devtools will require a 'composer'. Their own custom
// function composition. No big deal, as we'll eventually
// compose it with the standard redux compose.
//
// SEE:
// https://github.com/jhen0409/react-native-debugger
//
import { compose } from 'redux'
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default {
  composers: [devtools]
}
