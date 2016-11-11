'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStack = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// TODO: stack formatter + printer dump at build time, etc.

// composition for arrays, hashes, and functions
var mergeStack = _ramda2.default.reduce(_ramda2.default.mergeWith(function (a, b) {
  return _ramda2.default.isArrayLike(a) && _ramda2.default.isArrayLike(b) ? _ramda2.default.concat(a, b) : typeof a === 'function' && typeof b === 'function' ? (0, _redux.compose)(a, b) : _ramda2.default.merge(a, b);
}), []);

var combineStack = function combineStack(userStack, initial) {
  return mergeStack(_ramda2.default.concat(_ramda2.default.map(function (_ref) {
    var _ref$reducers = _ref.reducers,
        reducers = _ref$reducers === undefined ? [] : _ref$reducers,
        _ref$enhancers = _ref.enhancers,
        enhancers = _ref$enhancers === undefined ? [] : _ref$enhancers,
        _ref$composers = _ref.composers,
        composers = _ref$composers === undefined ? [] : _ref$composers;
    return { reducers: reducers, enhancers: enhancers, composers: composers };
  }, userStack), [initial]));
};

var buildStack = function buildStack() {
  var userStack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { reducers: {}, enhancers: [], composers: [_redux.compose] };

  var combinedStack = combineStack(userStack, initial);
  var stackCompose = combinedStack.composers && combinedStack.composers.length > 0 ? _redux.compose.apply(undefined, _toConsumableArray(combinedStack.composers)) : _redux.compose; // inception!
  var stack = { reducers: combinedStack.reducers, enhancer: stackCompose.apply(undefined, _toConsumableArray(combinedStack.enhancers)), meta: userStack };
  return stack;
};

exports.buildStack = buildStack;