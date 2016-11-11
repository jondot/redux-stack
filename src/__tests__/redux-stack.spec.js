import { buildStack } from '../redux-stack'
describe('buildStack', ()=>{
    it('with empty user stack', ()=>{
      const stack = buildStack()
      expect(stack).toMatchSnapshot()
      expect(stack.enhancer(1)).toEqual(1)
    })
    it('with staggered stack', ()=>{
      const stack = buildStack(
        [
          {reducers: { users: x=>x }},
          {enhancers: [x=>x*2]},
          {composers: [x=>x]},
        ]
      )
      expect(stack).toMatchSnapshot()
      expect(stack.enhancer(1)).toEqual(2)
    })
    it('with additive stack', ()=>{
      const stack = buildStack(
        [
          {reducers: { users: x=>x }, enhancers: [x=>x]},
          {reducers: { posts: x=>x }},
          {enhancers: [x=>x*4]},
          {composers: [x=>x]},
        ]
      )
      expect(stack).toMatchSnapshot()
      expect(stack.enhancer(1)).toEqual(4)
    })
})
