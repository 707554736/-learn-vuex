// 模块和命名空间
/**可以将store分割成模块，每个模块拥有自己的state、mutation、action、getter 还可以嵌套子模块，也是自上而下用相同方式分割的
 * 
 */

const moduleA = {
  state: () => { },
  mutations: {},
  actions: {},
  getters: {},
}

const moduleB = {
  state: () => { },
  mutations: {},
  actions: {},
  getters: {},
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
// 模块a的状态
store.state.a 
// 模块b的状态
store.state.b

/**
 * 模块的局部状态
 * 对于模块内部的mutation和getter， 接收的第一个参数是模块的局部状态对象
 */
const moduleA = {
  state: ()=>({

  })
}
