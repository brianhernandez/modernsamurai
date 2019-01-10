export default function(context) {
  console.log(
    '[Middleware init-auth.js] Initialize authentication if the token is available...'
  )
  context.store.dispatch('initAuth', context.req)
}
