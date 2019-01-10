export default function(context) {
  console.log(
    '[Middleware auth.js] If user is not authenticated, redirecting them to login page...'
  )
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/auth')
  }
}
