(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["ramda", "redux"], factory);
	else if(typeof exports === 'object')
		exports["Redux"] = factory(require("ramda"), require("redux"));
	else
		root["Redux"] = factory(root["ramda"], root["redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildStack = undefined;

	var _ramda = __webpack_require__(1);

	var _ramda2 = _interopRequireDefault(_ramda);

	var _redux = __webpack_require__(2);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;