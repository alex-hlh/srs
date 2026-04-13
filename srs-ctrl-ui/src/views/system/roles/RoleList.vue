<template>
  <div class="role-list">
    <a-card :bordered="false" class="search-form">
      <a-form layout="inline" :form="searchForm" @submit="handleSearch">
        <a-form-item label="角色名称">
          <a-input
            v-model="searchForm.roleName"
            placeholder="请输入角色名称"
            allow-clear
          />
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
        <a-button type="primary" @click="handleAdd">
          <a-icon type="plus" />新增
        </a-button>
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
          <a @click="handleAuthorize(record)">授权</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </template>
      </a-table>
    </a-card>

    <role-modal
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
import { roleList, roleDelete, roleAdd, roleEdit } from '@/api/system/role'
import RoleModal from './RoleModal'

export default {
  name: 'RoleList',
  components: {
    RoleModal
  },
  data() {
    return {
      searchForm: {
        roleName: ''
      },

      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          width: 150
        },
        {
          title: '角色编码',
          dataIndex: 'roleCode',
          width: 150
        },
        {
          title: '描述',
          dataIndex: 'description'
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
          width: 200,
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
        const { data } = await roleList(params)
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
      this.searchForm = { roleName: '' }
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

    handleAuthorize(record) {
      this.$message.info('授权功能开发中')
    },

    handleDelete(record) {
      this.$confirm({
        title: '确认删除',
        content: `确定删除角色 ${record.roleName} 吗？`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          await roleDelete(record.id)
          this.$message.success('删除成功')
          this.loadData()
        }
      })
    },

    async handleModalOk(data) {
      this.modalLoading = true
      try {
        if (this.isEdit) {
          await roleEdit(data)
          this.$message.success('编辑成功')
        } else {
          await roleAdd(data)
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
.role-list {
  .search-form {
    margin-bottom: 16px;
  }
}
</style>
