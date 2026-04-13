<template>
  <div class="user-list">
    <a-card :bordered="false" class="search-form">
      <a-form layout="inline" :form="searchForm" @submit="handleSearch">
        <a-form-item label="用户名">
          <a-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            allow-clear
            style="width: 150px"
          >
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">冻结</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit">
              <a-icon type="search" />查询
            </a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card :bordered="false" class="data-table">
      <div slot="title">
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <a-icon type="plus" />新增
          </a-button>
          <a-button @click="handleExport">
            <a-icon type="download" />导出
          </a-button>
        </a-space>
      </div>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        :row-key="record => record.id"
        @change="handleTableChange"
      >
        <template #status="{ text }">
          <a-badge :status="text === 1 ? 'success' : 'error'" />
          {{ text === 1 ? '正常' : '冻结' }}
        </template>

        <template #action="{ record }">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
          <a-divider type="vertical" />
          <a @click="handleResetPassword(record)">重置密码</a>
        </template>
      </a-table>
    </a-card>

    <user-modal
      ref="modal"
      :visible="modalVisible"
      :loading="modalLoading"
      :is-edit="isEdit"
      :record="currentRecord"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    />
  </div>
</template>

<script>
import { mixinPermissions } from '@/mixins/mixinPermissions'
import { userList, userDelete, userAdd, userEdit, resetPassword } from '@/api/system/user'
import UserModal from './UserModal'

export default {
  name: 'UserList',
  components: {
    UserModal
  },
  mixins: [mixinPermissions],
  data() {
    return {
      searchForm: {
        username: '',
        status: undefined
      },

      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          width: 120
        },
        {
          title: '真实姓名',
          dataIndex: 'realname',
          width: 120
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          width: 120
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 180
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],

      dataSource: [],
      loading: false,

      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      },

      modalVisible: false,
      modalLoading: false,
      isEdit: false,
      currentRecord: null
    }
  },

  created() {
    this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      try {
        const params = {
          pageNo: this.pagination.current,
          pageSize: this.pagination.pageSize,
          ...this.searchForm
        }
        const { data } = await userList(params)
        this.dataSource = data.records || []
        this.pagination.total = data.total || 0
      } finally {
        this.loading = false
      }
    },

    handleSearch() {
      this.pagination.current = 1
      this.loadData()
    },

    handleReset() {
      this.searchForm = {
        username: '',
        status: undefined
      }
      this.handleSearch()
    },

    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.loadData()
    },

    handleAdd() {
      this.currentRecord = null
      this.isEdit = false
      this.modalVisible = true
    },

    handleEdit(record) {
      this.currentRecord = record
      this.isEdit = true
      this.modalVisible = true
    },

    handleDelete(record) {
      this.$confirm({
        title: '确认删除',
        content: `确定删除用户 ${record.username} 吗？`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          await userDelete(record.id)
          this.$message.success('删除成功')
          this.loadData()
        }
      })
    },

    handleResetPassword(record) {
      this.$confirm({
        title: '确认重置',
        content: `确定重置用户 ${record.username} 的密码吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await resetPassword(record.id)
          this.$message.success('密码已重置为默认密码')
        }
      })
    },

    handleExport() {
      this.$message.info('导出功能开发中')
    },

    async handleModalOk(data) {
      this.modalLoading = true
      try {
        if (this.isEdit) {
          await userEdit(data)
          this.$message.success('编辑成功')
        } else {
          await userAdd(data)
          this.$message.success('新增成功')
        }
        this.modalVisible = false
        this.loadData()
      } finally {
        this.modalLoading = false
      }
    },

    handleModalCancel() {
      this.modalVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-list {
  .search-form {
    margin-bottom: 16px;
  }

  .data-table {
    ::v-deep .ant-table {
      .ant-table-thead > tr > th {
        background: #fafafa;
      }
    }
  }
}
</style>
