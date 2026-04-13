const state = {
  onlineUsers: []
}

const mutations = {
  SET_ONLINE_USERS(state, users) {
    state.onlineUsers = users
  }
}

const actions = {
  UpdateOnlineUsers({ commit }, users) {
    commit('SET_ONLINE_USERS', users)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
