<template>
  <div class="dict-list">
    <a-card :bordered="false" class="search-form">
      <a-form layout="inline" :form="searchForm" @submit="handleSearch">
        <a-form-item label="字典名称">
          <a-input
            v-model="searchForm.dictName"
            placeholder="请输入字典名称"
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

    <a-card :bordered="false">
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
          <a @click="handleItems(record)">字典项</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </template>
      </a-table>
    </a-card>

    <dict-modal
      ref="modal"
      :visible="modalVisible"
      :loading="modalLoading"
      :is-edit="isEdit"
      :record="currentRecord"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    />

    <dict-item-modal
      ref="itemModal"
      :dict-type="currentDictType"
      :visible="itemModalVisible"
      @close="itemModalVisible = false"
    />
  </div>
</template>

<script>
import { dictTypeList, dictTypeDelete, dictTypeAdd, dictTypeEdit } from '@/api/system/dict'
import DictModal from './DictModal'
import DictItemModal from './DictItemModal'

export default {
  name: 'DictList',
  components: {
    DictModal,
    DictItemModal
  },
  data() {
    return {
      searchForm: {
        dictName: ''
      },

      columns: [
        {
          title: '字典名称',
          dataIndex: 'dictName',
          width: 200
        },
        {
          title: '字典编码',
          dataIndex: 'dictCode',
          width: 200
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
      currentRecord: null,

      itemModalVisible: false,
      currentDictType: ''
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
        const { data } = await dictTypeList(params)
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
      this.searchForm = { dictName: '' }
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

    handleItems(record) {
      this.currentDictType = record.dictCode
      this.itemModalVisible = true
    },

    handleDelete(record) {
      this.$confirm({
        title: '确认删除',
        content: `确定删除字典 ${record.dictName} 吗？`,
        okText: '确定',
        okType: 'danger',
        onOk: async () => {
          await dictTypeDelete(record.id)
          this.$message.success('删除成功')
          this.loadData()
        }
      })
    },

    async handleModalOk(data) {
      this.modalLoading = true
      try {
        if (this.isEdit) {
          await dictTypeEdit(data)
        } else {
          await dictTypeAdd(data)
        }
        this.$message.success(this.isEdit ? '编辑成功' : '新增成功')
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
.dict-list {
  .search-form {
    margin-bottom: 16px;
  }
}
</style>
