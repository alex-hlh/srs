<template>
  <div class="dashboard">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="用户总数"
            :value="stats.userCount"
            :prefix="h(AIcon, { type: 'user' })"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="角色总数"
            :value="stats.roleCount"
            :prefix="h(AIcon, { type: 'team' })"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="部门总数"
            :value="stats.departmentCount"
            :prefix="h(AIcon, { type: 'cluster' })"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="在线用户"
            :value="stats.onlineCount"
            :prefix="h(AIcon, { type: 'desktop' })"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'

const AIcon = Icon

export default {
  name: 'Dashboard',
  data() {
    return {
      h,
      stats: {
        userCount: 128,
        roleCount: 12,
        departmentCount: 45,
        onlineCount: 8
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  padding: 16px;

  .ant-row {
    margin-bottom: 16px;
  }
}
</style>
