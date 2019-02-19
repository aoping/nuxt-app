export default function ({
  store,
  redirect
}) {
  if (!store.state.user || !store.state.user.email) {
    return redirect('/admin/login')
  }
}
