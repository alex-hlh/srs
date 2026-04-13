import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import online from './modules/online'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    online
  },
  getters: {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    realname: state => state.user.realname,
    permissionList: state => state.user.permissionList,
    permissionStringList: state => state.user.permissionStringList
  }
})
