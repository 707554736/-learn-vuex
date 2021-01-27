// 模块和命名空间
/**可以将store分割成模块，每个模块拥有自己的state、mutation、action、getter 还可以嵌套子模块，也是自上而下用相同方式分割的
 * 
 */

const { mapActions } = require("vuex")

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
 * 对于模块内部的mutation和getter， 接收的第一个参数是模块的 局部 状态对象
 * 对于模块内部的action， 局部状态通过context.state暴露出来，根节点状态为context.rootState
 * 对于模块内部的getter， 根节点状态会作为第三个参数暴露
 */
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment(state) {
      state.count++
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  actions: {
    // 此处参数为context对象解构
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

/**
 * 命名空间
 * 默认情况下 模块内部的action、mutation和getter是注册在全局命名空间的 这样使得多个模块能够对于同一mutation或者action作出相应
 * 可以通过namespaced：true的方式让模块成为带命名空间的模块 模块被注册后，它的所有getter、action和mutation会根据模块注册的路径调整命名
 * 使用模块内容时 不需要在同一模块内额外添加命名空间前缀
 */
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块中的状态已经是嵌套的，使用namespaced不会有影响
      state: () => ({}),
      // getters['account/isAdmin']
      getters: {
        isAdmin() { }
      },
      // dispatch('account/login')
      actions: {
        login() { }
      },
      //  commit('account/login')
      mutations: {
        login() { }
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => { },
          // getters['account/profile']
          getters: {
            profile() { }
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          getters: {
            // getters['account/posts/popular']
            popular() { }
          }
        }
      }
    }
  }
})

/**
 * 在带命名空间的模块注册全局action，添加root: true,并且将这个action的定义放在函数handler中
 */

const globalAction = new Vuex.Store({
  actions: {
    someOtherAction({ dispatch }) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,
      actions: {
        someAction: {
          root: true,
          handler(namespacedContext, payload) { }
        }
      }
    }
  }
})

/**带命名空间的绑定函数
 * 可以将模块的空间名称字符串作为第一个参数传递，这样所有的绑定丢回将该模块作为上下文
 */
/**
 * 简写的绑定方法：
 * computed:{
 *  mapState('some/nested/module', {
 *    a:state=>state.a,
 *    b:state=>state.b
 * })
 * },
 * methods: {
 *  mapActions('some/nested/module', {
 *  'foo',
 *  'bar'
 * })
 * }
 */

/**
 * 可以使用createNamespacedHelpers 创建基于某个命名空间辅助函数，它返回一个对象，对象里有新的绑定在给命名空间值上的组件绑定辅助函数
 */

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed:
    mapState({
      a: state => state.a,
      b: state => state.b
    }),
  methods: mapActions([
    'bar',
    'foo'])
}

/**
 * 模块动态注册
 * store创建后，可以用store.registerModule的方法注册模块
 */

 const dynamicStore = new Vuex.Store({})
// 注册模块‘myModule’
 dynamicStore.registerModule('myModule', {})
// 注册嵌套模块‘nested/myModule’
dynamicStore.registerModule(['nested', 'myModule'], {})
