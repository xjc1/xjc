export default {
  namespaced: true,
  state: {
    userInfo:{}
  },
  mutations: {
    setUserInfo(state, val) {
      state.userInfo = val
    },
  },
  actions: {
    // setTabActive({ commit }, val) {
    //   commit('setTabActive', val)
    // },
  }
}
