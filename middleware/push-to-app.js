export default function(context) {
  console.log(
    '[Middleware push-to-app.js] If user is authenticated, redirecting them to app entrance...'
  )
  if (context.store.getters.isAuthenticated) {
    context.redirect('/app')
  }
}
