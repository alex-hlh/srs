<template>
  <div class="header-content">
    <div class="header-left">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="$emit('toggle')"
      />
      <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
          {{ item.name }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="header-right">
      <a-input-search
        class="search-input"
        placeholder="搜索"
        style="width: 200px"
        @search="onSearch"
      />
      <a-badge :count="3" class="notification">
        <a-icon type="bell" />
      </a-badge>
      <a-dropdown class="user-dropdown">
        <div class="user-info">
          <a-avatar :src="avatar" />
          <span class="username">{{ realname || username }}</span>
        </div>
        <a-menu slot="overlay">
          <a-menu-item key="profile">
            <a-icon type="user" />个人中心
          </a-menu-item>
          <a-menu-item key="settings">
            <a-icon type="setting" />设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout" @click="handleLogout">
            <a-icon type="logout" />退出登录
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HeaderContent',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      breadcrumbs: []
    }
  },
  computed: {
    ...mapGetters(['username', 'realname', 'avatar'])
  },
  watch: {
    $route() {
      this.updateBreadcrumbs()
    }
  },
  mounted() {
    this.updateBreadcrumbs()
  },
  methods: {
    ...mapActions('user', ['Logout']),
    updateBreadcrumbs() {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.breadcrumbs = matched.map(item => ({
        path: item.path,
        name: item.meta.title
      }))
    },
    onSearch(value) {
      console.log('Search:', value)
    },
    handleLogout() {
      this.Logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .header-left {
    display: flex;
    align-items: center;

    .trigger {
      font-size: 18px;
      cursor: pointer;
      margin-right: 16px;
    }

    .breadcrumb {
      font-size: 14px;
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .search-input {
      margin-right: 16px;
    }

    .notification {
      margin-right: 16px;
      cursor: pointer;
    }

    .user-dropdown {
      cursor: pointer;

      .user-info {
        display: flex;
        align-items: center;

        .username {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
