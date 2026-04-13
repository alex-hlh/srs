<template>
  <div class="basic-layout">
    <a-layout class="layout-container">
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        :width="200"
        class="layout-sider"
      >
        <div class="logo">
          <span v-if="!collapsed">星环空间</span>
          <span v-else>SRS</span>
        </div>
        <side-menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout-header">
          <header-content
            :collapsed="collapsed"
            @toggle="toggleCollapsed"
          />
        </a-layout-header>
        <a-layout-content class="layout-content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SideMenu from '@/components/layout/SideMenu'
import HeaderContent from '@/components/layout/HeaderContent'

export default {
  name: 'BasicLayout',
  components: {
    SideMenu,
    HeaderContent
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    ...mapMutations('app', ['SET_SIDEBAR']),
    toggleCollapsed() {
      this.collapsed = !this.collapsed
      this.SET_SIDEBAR({ opened: !this.collapsed })
    }
  }
}
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100%;
}

.layout-container {
  height: 100%;
}

.layout-sider {
  background: #001529;

  .logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.05);
  }
}

.layout-header {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.layout-content {
  margin: 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
