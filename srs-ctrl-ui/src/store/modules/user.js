import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/api/login'

const state = {
  token: getToken() || '',
  username: '',
  realname: '',
  avatar: '',
  permissionList: [],
  permissionStringList: [],
  info: {}
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  SET_USER_INFO(state, info) {
    state.info = info
    state.username = info.username || ''
    state.realname = info.realname || ''
    state.avatar = info.avatar || ''
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissionList = permissions || []
    state.permissionStringList = permissions || []
  },
  CLEAR_USER(state) {
    state.token = ''
    state.username = ''
    state.realname = ''
    state.avatar = ''
    state.permissionList = []
    state.permissionStringList = []
    state.info = {}
  }
}

const actions = {
  async Login({ commit }, userInfo) {
    const result = await login(userInfo)
    if (result.code === 0) {
      const token = result.data?.token
      if (token) {
        commit('SET_TOKEN', token)
      }
      if (result.data?.userInfo) {
        commit('SET_USER_INFO', result.data.userInfo)
      }
      if (result.data?.permissions) {
        commit('SET_PERMISSIONS', result.data.permissions)
      }
    }
    return result
  },

  async GetUserInfo({ commit }) {
    const result = await getUserInfo()
    if (result.code === 0 && result.data) {
      commit('SET_USER_INFO', result.data)
    }
    return result
  },

  async Logout({ commit }) {
    try {
      await logout()
    } finally {
      commit('CLEAR_USER')
      removeToken()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
