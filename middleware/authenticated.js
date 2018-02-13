export default function ({ process, store, redirect }) {  
  if (!(store.state.user && store.state.user.sessionId)) {
    return redirect('/login')
  }
}
