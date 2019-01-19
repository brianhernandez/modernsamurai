import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: null,
      user: {}
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
        let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          process.env.FB_API_KEY
        }`
        if (!authData.isLogin) {
          authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
            process.env.FB_API_KEY
          }`
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
            localStorage.setItem('uid', result.localId)
            Cookie.set('jwt', result.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            Cookie.set('uid', result.localId)

            if (!authData.isLogin) {
              vuexContext.dispatch('createUser', {
                uid: result.localId,
                email: authData.email
              })
            } else {
              console.log('Getting authenticated user data...')
              vuexContext.dispatch('getUserData', {
                token: result.idToken,
                uid: result.localId
              })
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
      createUser(vuexContext, userObject) {
        let putUrl = `https://modern-samurai.firebaseio.com/users/${
          userObject.uid
        }.json`
        return this.$axios
          .$put(putUrl, {
            email: userObject.email,
            firstName: null,
            lastName: null,
            dob: null,
            profileQuote: null
          })
          .then(result => {
            console.log('response from trying to add to database:', result)
            vuexContext.commit('SET_USER', {
              uid: userObject.uid,
              email: userObject.email,
              firstName: null,
              lastName: null,
              dob: null,
              profileQuote: null
            })
          })
          .catch(e => console.log(e))
      },
      getUserData(vuexContext, authObject) {
        let getUrl = `https://modern-samurai.firebaseio.com/users/${
          authObject.uid
        }.json`
        return this.$axios
          .$get(getUrl)
          .then(result => {
            console.log('We got the user data, here it is: ', result)
            vuexContext.commit('SET_USER', {
              uid: authObject.uid,
              email: result.email,
              firstName: result.firstName,
              lastName: result.lastName,
              dob: result.dob,
              profileQuote: result.profileQuote
            })
          })
          .catch(e => console.log(e))
      },
      updateUserData(vuexContext, userObject) {
        let uid = vuexContext.getters.user.uid
        let updateUserDataUrl = `https://modern-samurai.firebaseio.com/users/${uid}.json`
        delete userObject.uid

        console.log('updateUserDataUrl is: ', updateUserDataUrl)
        console.log('this is: ', this)
        console.log('vuexContext is: ', vuexContext)
        console.log('userObject being sent to update records: ', userObject)

        return this.$axios
          .$put(updateUserDataUrl, userObject)
          .then(result => {
            console.log(result)
            vuexContext.commit('SET_USER', { ...userObject, uid })
          })
          .catch(e => console.log(e))
      },
      initAuth(vuexContext, request) {
        let token
        let expirationDate
        let uid

        if (request) {
          if (!request.headers.cookie) {
            return
          }
          const jwtCookie = request.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          const uidCookie = request.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('uid='))
          if (!jwtCookie) {
            return
          }
          if (!uidCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = request.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
          uid = uidCookie.split('=')[1]
        } else if (process.client) {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
          uid = localStorage.getItem('uid')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('SET_TOKEN', token)
        // vuexContext.dispatch('getUserData', { token: token, uid: uid })
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
      user(state) {
        return state.user
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}
export default createStore
