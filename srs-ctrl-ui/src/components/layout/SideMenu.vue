<template>
  <a-menu
    v-model="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    :menu-data="menuData"
    @click="handleMenuClick"
  >
    <template v-for="item in menuData">
      <a-menu-item v-if="!item.children" :key="item.path">
        <a-icon :type="item.icon || 'appstore'" />
        <span>{{ item.name }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-item="item" />
    </template>
  </a-menu>
</template>

<script>
import { getMenuByToken } from '@/api/login'

export default {
  name: 'SideMenu',
  data() {
    return {
      selectedKeys: [],
      menuData: []
    }
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.loadMenu()
  },
  methods: {
    async loadMenu() {
      try {
        const res = await getMenuByToken()
        if (res.success) {
          this.menuData = res.result || []
        }
      } catch (error) {
        console.error('Failed to load menu:', error)
      }
    },
    handleMenuClick({ key }) {
      this.$router.push(key)
    }
  }
}
</script>
