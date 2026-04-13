<template>
  <div class="department-list">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :bordered="false" title="部门树">
          <template #extra>
            <a-button-group size="small">
              <a-button type="primary" @click="handleAdd">
                <a-icon type="plus" />
              </a-button>
              <a-button @click="handleSync">
                <a-icon type="sync" />
              </a-button>
            </a-button-group>
          </template>
          <a-tree
            v-model="selectedKeys"
            :tree-data="treeData"
            :selected-keys="selectedKeys"
            :expanded-keys="expandedKeys"
            @select="handleTreeSelect"
            @expand="handleExpand"
          >
            <template #title="node">
              <span>{{ node.title }}</span>
              <a-space class="tree-actions">
                <a-icon type="edit" @click.stop="handleEdit(node)" />
                <a-icon type="plus" @click.stop="handleAddChild(node)" />
                <a-icon type="delete" @click.stop="handleDelete(node)" />
              </a-space>
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card :bordered="false" title="部门信息">
          <a-form
            v-if="currentNode"
            ref="form"
            :form="form"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-form-item label="部门名称">
              <a-input v-model="currentNode.title" />
            </a-form-item>
            <a-form-item label="部门编码">
              <a-input v-model="currentNode.key" disabled />
            </a-form-item>
            <a-form-item label="排序">
              <a-input-number v-model="currentNode.orderNum" />
            </a-form-item>
            <a-form-item label="备注">
              <a-textarea v-model="currentNode.remark" :rows="4" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSave">保存</a-button>
            </a-form-item>
          </a-form>
          <div v-else class="empty-tip">
            请从左侧选择部门
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { departmentTree, departmentAdd, departmentEdit, departmentDelete, departmentSync } from '@/api/system/department'

export default {
  name: 'DepartmentList',
  data() {
    return {
      treeData: [],
      selectedKeys: [],
      expandedKeys: [],
      currentNode: null,
      form: {}
    }
  },
  created() {
    this.loadTree()
  },
  methods: {
    async loadTree() {
      try {
        const { data } = await departmentTree()
        this.treeData = this.buildTree(data || [])
      } catch (error) {
        console.error('Failed to load department tree:', error)
      }
    },

    buildTree(list) {
      const map = {}
      const roots = []

      list.forEach(item => {
        map[item.id] = { ...item, key: item.id, title: item.departName, children: [] }
      })

      list.forEach(item => {
        if (item.parentId) {
          map[item.parentId]?.children.push(map[item.id])
        } else {
          roots.push(map[item.id])
        }
      })

      return roots
    },

    handleTreeSelect(selectedKeys) {
      if (selectedKeys.length > 0) {
        const node = this.findNode(this.treeData, selectedKeys[0])
        this.currentNode = node ? { ...node } : null
      } else {
        this.currentNode = null
      }
    },

    findNode(tree, key) {
      for (const node of tree) {
        if (node.key === key) return node
        if (node.children) {
          const found = this.findNode(node.children, key)
          if (found) return found
        }
      }
      return null
    },

    handleExpand(keys) {
      this.expandedKeys = keys
    },

    handleAdd() {
      this.currentNode = {
        title: '新部门',
        key: '',
        parentId: '',
        orderNum: 0,
        isNew: true
      }
    },

    handleAddChild(node) {
      const newNode = {
        title: '新部门',
        key: '',
        parentId: node.key,
        orderNum: 0,
        isNew: true
      }
      if (!node.children) {
        this.$set(node, 'children', [])
      }
      node.children.push(newNode)
      this.expandedKeys = [...this.expandedKeys, node.key]
    },

    handleEdit(node) {
      this.currentNode = { ...node, isNew: false }
    },

    handleDelete(node) {
      this.$confirm({
        title: '确认删除',
        content: `确定删除部门 ${node.title} 吗？`,
        okText: '确定',
        okType: 'danger',
        onOk: async () => {
          await departmentDelete(node.key)
          this.$message.success('删除成功')
          this.loadTree()
        }
      })
    },

    async handleSave() {
      if (!this.currentNode) return

      try {
        if (this.currentNode.isNew) {
          await departmentAdd(this.currentNode)
        } else {
          await departmentEdit(this.currentNode)
        }
        this.$message.success('保存成功')
        this.loadTree()
      } catch (error) {
        console.error('Failed to save:', error)
      }
    },

    async handleSync() {
      try {
        await departmentSync()
        this.$message.success('同步成功')
        this.loadTree()
      } catch (error) {
        console.error('Failed to sync:', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.department-list {
  .tree-actions {
    margin-left: 8px;
    opacity: 0;
    transition: opacity 0.3s;

    i {
      margin-right: 4px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }
    }
  }

  ::v-deep .ant-tree-node-content-wrapper:hover .tree-actions {
    opacity: 1;
  }

  .empty-tip {
    text-align: center;
    color: #999;
    padding: 40px 0;
  }
}
</style>
