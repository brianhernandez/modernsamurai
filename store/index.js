import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: null
    }),
    mutations: {},
    actions: {
      authenticateUser(vuexContext, authData) {
        let authUrl =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          process.env.FB_API_KEY
        if (!authData.isLogin) {
          authUrl =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            process.env.FB_API_KEY
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('SET_TOKEN', result.idToken)
            localStorage.setItem('token', result.idToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            Cookie.set('jwt', result.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            // console.log(result.expiresIn, result.expiresIn * 1000)
            // vuexContext.dispatch('setLogoutTimer', result.expiresIn * 1000)
            return this.$axios.$post('http://localhost:3000/api/track-data', {
              data: 'Authenticated!'
            })
          })
          .catch(e => console.log(e))
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}
export default createStore
