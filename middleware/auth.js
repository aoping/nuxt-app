export default function ({
  store,
  redirect
}) {
  console.log('store.state.user')
  console.log(store.state.user)
  if (!store.state.user || !store.state.user.email) {
    return redirect('/admin/login')
  }
}
