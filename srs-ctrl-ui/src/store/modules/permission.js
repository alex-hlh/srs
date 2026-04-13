import { getMenuByToken } from '@/api/login'
import { flatMultiLevelRoutes } from '@/utils/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  async GenerateRoutes({ commit }) {
    try {
      const result = await getMenuByToken()
      if (result.code === 0 && result.data) {
        const menuTree = result.data.menuTree || []
        const accessedRoutes = flatMultiLevelRoutes(menuTree)
        commit('SET_ROUTES', accessedRoutes)
        return accessedRoutes
      }
      return []
    } catch (error) {
      console.error('GenerateRoutes error:', error)
      return []
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
