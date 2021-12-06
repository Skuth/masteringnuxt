export default {
  SET_USER(state, { user }) {
    state.isLoggedIn = !!user
    state.user = user || {}
  }
}
