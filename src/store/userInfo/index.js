export default {
  namespaced: true,
  state: {
    userInfo:{},
    isAdmin:false
  },
  mutations: {
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setUserPermission(state, val =false) {
      state.isAdmin = val
    },
  },
  actions: {
    // setTabActive({ commit }, val) {
    //   commit('setTabActive', val)
    // },
  }
}
