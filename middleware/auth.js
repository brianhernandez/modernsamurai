export default function(context) {
  console.log('[Middleware] Checking if user is Authenticated')
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/auth')
  }
}
