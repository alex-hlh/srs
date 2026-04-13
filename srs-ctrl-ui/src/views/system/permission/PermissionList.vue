<template>
  <div class="permission-list">
    <a-row :gutter="16">
      <a-col :span="10">
        <a-card :bordered="false" title="菜单权限树">
          <template #extra>
            <a-button type="primary" size="small" @click="handleAdd">
              <a-icon type="plus" />新增
            </a-button>
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
              <span v-if="node.type === 0"><a-icon type="folder" /> {{ node.title }}</span>
              <span v-else-if="node.type === 1"><a-icon type="file" /> {{ node.title }}</span>
              <span v-else><a-icon type="button" /> {{ node.title }}</span>
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="14">
        <a-card :bordered="false" title="权限信息">
          <a-form
            v-if="currentNode"
            ref="form"
            :form="form"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-form-item label="菜单名称">
              <a-input v-model="currentNode.title" />
            </a-form-item>
            <a-form-item label="菜单编码">
              <a-input v-model="currentNode.name" />
            </a-form-item>
            <a-form-item label="菜单类型">
              <a-select v-model="currentNode.type">
                <a-select-option :value="0">目录</a-select-option>
                <a-select-option :value="1">菜单</a-select-option>
                <a-select-option :value="2">按钮</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="路由路径">
              <a-input v-model="currentNode.path" />
            </a-form-item>
            <a-form-item label="组件路径">
              <a-input v-model="currentNode.component" />
            </a-form-item>
            <a-form-item label="图标">
              <a-input v-model="currentNode.icon" />
            </a-form-item>
            <a-form-item label="排序">
              <a-input-number v-model="currentNode.orderNum" />
            </a-form-item>
            <a-form-item label="权限标识">
              <a-input v-model="currentNode.permission" placeholder="如: sys:user:add" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSave">保存</a-button>
              <a-button style="margin-left: 8px" @click="handleDelete">删除</a-button>
            </a-form-item>
          </a-form>
          <div v-else class="empty-tip">
            请从左侧选择菜单
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { permissionTree, permissionAdd, permissionEdit, permissionDelete } from '@/api/system/permission'

export default {
  name: 'PermissionList',
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
        const { data } = await permissionTree()
        this.treeData = this.buildTree(data || [])
      } catch (error) {
        console.error('Failed to load permission tree:', error)
      }
    },

    buildTree(list) {
      const map = {}
      const roots = []

      list.forEach(item => {
        map[item.id] = { ...item, key: item.id, title: item.name, children: [] }
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
        title: '新菜单',
        type: 1,
        orderNum: 0,
        isNew: true
      }
    },

    async handleSave() {
      if (!this.currentNode) return

      try {
        if (this.currentNode.isNew) {
          await permissionAdd(this.currentNode)
        } else {
          await permissionEdit(this.currentNode)
        }
        this.$message.success('保存成功')
        this.loadTree()
      } catch (error) {
        console.error('Failed to save:', error)
      }
    },

    handleDelete() {
      if (!this.currentNode || this.currentNode.isNew) return

      this.$confirm({
        title: '确认删除',
        content: `确定删除菜单 ${this.currentNode.title} 吗？`,
        okText: '确定',
        okType: 'danger',
        onOk: async () => {
          await permissionDelete(this.currentNode.key)
          this.$message.success('删除成功')
          this.currentNode = null
          this.loadTree()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.permission-list {
  .empty-tip {
    text-align: center;
    color: #999;
    padding: 40px 0;
  }
}
</style>
