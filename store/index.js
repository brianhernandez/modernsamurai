import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: null
    }),
    mutations: {
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state) {
        state.token = null
      }
    },
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
            console.log(result)
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
            // return this.$axios.$post('http://localhost:3000/api/track-data', {
            //   data: 'Authenticated!'
            // })
          })
          .catch(e => {
            console.log(e.response.data.error.message)
            if (e.response.data.error.message === 'EMAIL_EXISTS') {
              throw new Error('EMAIL_EXISTS')
            } else if (
              e.response.data.error.message === 'INVALID_PASSWORD' ||
              e.response.data.error.message === 'EMAIL_NOT_FOUND'
            ) {
              throw new Error('INVALID_LOGIN')
            }
          })
      },
      logout(vuexContext) {
        vuexContext.commit('CLEAR_TOKEN')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
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
