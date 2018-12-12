import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: null
    }),
    mutations: {},
    actions: {},
    getters: {
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}
export default createStore
