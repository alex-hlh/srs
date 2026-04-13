<template>
  <a-modal
    :visible="visible"
    :title="`字典项 - ${dictType}`"
    :footer="null"
    @cancel="handleClose"
    width="800px"
  >
    <a-button type="primary" style="margin-bottom: 16px" @click="handleAdd">
      <a-icon type="plus" />新增字典项
    </a-button>

    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="false"
      :row-key="record => record.id"
    >
      <template #action="{ record }">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record)">删除</a>
      </template>
    </a-table>

    <a-modal
      :visible="modalVisible"
      :title="isEdit ? '编辑字典项' : '新增字典项'"
      :confirm-loading="modalLoading"
      @ok="handleModalOk"
      @cancel="modalVisible = false"
      width="400px"
    >
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="字典项文本">
          <a-input v-model="currentItem.itemText" />
        </a-form-item>
        <a-form-item label="字典项值">
          <a-input v-model="currentItem.itemValue" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="currentItem.sortOrder" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model="currentItem.status">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">冻结</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-modal>
</template>

<script>
import { dictItemList, dictItemAdd, dictItemEdit, dictItemDelete } from '@/api/system/dict'

export default {
  name: 'DictItemModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dictType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: [
        { title: '文本', dataIndex: 'itemText' },
        { title: '值', dataIndex: 'itemValue' },
        { title: '排序', dataIndex: 'sortOrder', width: 80 },
        { title: '状态', dataIndex: 'status', width: 80 },
        { title: '操作', key: 'action', width: 150, scopedSlots: { customRender: 'action' } }
      ],
      dataSource: [],
      loading: false,
      modalVisible: false,
      modalLoading: false,
      isEdit: false,
      currentItem: {},
      form: {}
    }
  },
  watch: {
    visible(val) {
      if (val && this.dictType) {
        this.loadItems()
      }
    }
  },
  methods: {
    async loadItems() {
      this.loading = true
      try {
        const { data } = await dictItemList(this.dictType)
        this.dataSource = data || []
      } finally {
        this.loading = false
      }
    },

    handleAdd() {
      this.isEdit = false
      this.currentItem = {
        dictType: this.dictType,
        itemText: '',
        itemValue: '',
        sortOrder: 0,
        status: 1
      }
      this.modalVisible = true
    },

    handleEdit(record) {
      this.isEdit = true
      this.currentItem = { ...record }
      this.modalVisible = true
    },

    handleDelete(record) {
      this.$confirm({
        title: '确认删除',
        content: '确定删除该字典项吗？',
        okText: '确定',
        okType: 'danger',
        onOk: async () => {
          await dictItemDelete(record.id)
          this.$message.success('删除成功')
          this.loadItems()
        }
      })
    },

    async handleModalOk() {
      this.modalLoading = true
      try {
        if (this.isEdit) {
          await dictItemEdit(this.currentItem)
        } else {
          await dictItemAdd(this.currentItem)
        }
        this.$message.success('保存成功')
        this.modalVisible = false
        this.loadItems()
      } finally {
        this.modalLoading = false
      }
    },

    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
