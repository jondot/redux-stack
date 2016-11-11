'use strict';

var _reduxStack = require('../redux-stack');

describe('buildStack', function () {
  it('with empty user stack', function () {
    var stack = (0, _reduxStack.buildStack)();
    expect(stack).toMatchSnapshot();
    expect(stack.enhancer(1)).toEqual(1);
  });
  it('with staggered stack', function () {
    var stack = (0, _reduxStack.buildStack)([{ reducers: { users: function users(x) {
          return x;
        } } }, { enhancers: [function (x) {
        return x * 2;
      }] }, { composers: [function (x) {
        return x;
      }] }]);
    expect(stack).toMatchSnapshot();
    expect(stack.enhancer(1)).toEqual(2);
  });
  it('with additive stack', function () {
    var stack = (0, _reduxStack.buildStack)([{ reducers: { users: function users(x) {
          return x;
        } }, enhancers: [function (x) {
        return x;
      }] }, { reducers: { posts: function posts(x) {
          return x;
        } } }, { enhancers: [function (x) {
        return x * 4;
      }] }, { composers: [function (x) {
        return x;
      }] }]);
    expect(stack).toMatchSnapshot();
    expect(stack.enhancer(1)).toEqual(4);
  });
});