import store from '@/store'

export default {
  methods: {
    vPermission(action) {
      const permissionList = store.getters.permissionStringList || []
      return permissionList.includes(action)
    }
  }
}
