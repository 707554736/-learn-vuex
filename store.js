import Vue from 'vue'
import Vuex, { mapState, mapGetters } from 'vuex'

// mapGetters 将store中的getter映射到局部计算属性

Vue.use(Vuex)

const store = new Vuex.Store(
  {
    state: {
      count: 0
    },
    // 这个选项类似于事件注册， 当触发一个类型为 increment 的 mutation 时，调用此函数
    // 唤醒则用相应的type调用store.commit方法 store.commit('increment')
    mutations: {
      increment(state) {
        state.count++
      }
    },
    // 在store中定义getters，可认为是store的计算属性，只有依赖改变，值才会被重新计算
    // 通过属性的形式访问 store.getters.doneToDos
    getters: {
      doneToDos: state => {
        return state.todos.filter(todo => todo.done)
      },
      doneTodosCount: (state, getters) => {
        return getters.doneToDos.length
      },
      // 通过getter返回一个函数 实现给getter传参
      getTodoById: (state) => (id) => {
        return state.todos.find(
          todo => todo.id === id
        )
      }
    },
    // Action : 类似于mutation，不同：
    /**
     * 1.Action提交的是mutation 不是直接变更状态
     * 2.Action可以包含任意异步操作, mutation必须同步执行
     * action 函数接收一个于store实例具有相同方法和属性的context对象，可以调用context.commit提交一个mutation，或者通过context.state和context.getters获取state和getters
     */
    actions: {
      increment(context) {
        context.commit('increment')
      },
      /**解构代码方式
       * increment({ commit }){
       *  commit('increment')
       * }
       */
      // 购物车示例
      checkout({ commit, state }, products) {
        // 备份当前购物车物品
        const savedCartItems = [...state.cart.added]
        commit(types.CHECKOUT_REQUEST)
        // 购物API接收一个成功回调和一个失败回调
        shop.buyProducts(
          products,

          () => commit(type.CHECKOUT_REQUEST),

          () => commit(type.CHECKOUT_FAILURE, savedCartItems)
        )
      }
    }
  }
)

// module: Vuex允许将store分割成模块，每个模块拥有自己的state mutation actin getter从上到下的进行相同方式的分割

store.commit('increment')

console.log(store.state.count);

// 一个组件需要获取多个状态是，使用mapState生成计算属性
// 如果映射的计算属性的名称与state的子节点名称相同，也可以给mapState传入一个字符串数组
// mapState返回的是一个对象 用工具函数将多个对象合并为一个，可以把最终镀锡传给computed属性
export default {
  computed: mapState({
    count: state => state.count,

    countAlias: 'count',

    countPlusLocalState(state) {
      return state.count + this.localcount
    }
  })
}

// mapGetter辅助函数
export default {
  computed: {
    ...mapGetters({
      // 可以通过对象的形式为属性重命名
      doneCount: 'doneTodosCount'
    })
  }
}


const Counter = {
  template: `<div>{{count}}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    },
  }
}

// 把store对象提供给"store" 选项，可以把store的实例注入所有的子组件，子组件可以通过this.$store访问
const app = new Vue({
  el: '#app',
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})