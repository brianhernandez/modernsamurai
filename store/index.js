import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: null,
      user: null
    }),
    mutations: {
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state) {
        state.token = null
      },
      SET_USER(state, user) {
        state.user = user
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

            if (!authData.isLogin) {
              vuexContext.dispatch('createUser', authData.email)
            }
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
      createUser(vuexContext, email) {
        console.log('this is the email to send over: ', email)
        let postUrl = `https://modern-samurai.firebaseio.com/db.json?auth=${
          vuexContext.state.token
        }`
        return this.$axios
          .$post(postUrl, { email: email })
          .then(result => {
            console.log(result)
            vuexContext.commit('SET_USER', { email: email })
          })
          .catch(e => console.log(e))
      },
      initAuth(vuexContext, request) {
        let token
        let expirationDate

        if (request) {
          if (!request.headers.cookie) {
            return
          }
          const jwtCookie = request.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = request.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else if (process.client) {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('SET_TOKEN', token)
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
