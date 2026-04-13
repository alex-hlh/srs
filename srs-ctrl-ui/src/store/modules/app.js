const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  theme: 'dark',
  layout: 'side',
  multipage: true
}

const mutations = {
  SET_SIDEBAR(state, payload) {
    state.sidebar = { ...state.sidebar, ...payload }
  },
  SET_DEVICE(state, device) {
    state.device = device
  },
  SET_THEME(state, theme) {
    state.theme = theme
  },
  SET_LAYOUT(state, layout) {
    state.layout = layout
  },
  SET_MULTIPAGE(state, multipage) {
    state.multipage = multipage
  }
}

const actions = {
  ToggleSidebar({ commit }) {
    commit('SET_SIDEBAR', {
      opened: !state.sidebar.opened,
      withoutAnimation: false
    })
  },
  ToggleDevice({ commit }, device) {
    commit('SET_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
