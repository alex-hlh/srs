import React, { useState, useEffect } from 'react'
import { Tree, Button, Space, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree'
import { getPermissionTree, type PermissionItem } from '@/api/system/permission'

const PermissionList: React.FC = () => {
  const [dataSource, setDataSource] = useState<PermissionItem[]>([])
  const [, setLoading] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getPermissionTree()
      if (res.success && res.data) {
        setDataSource(res.data || [])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    message.info('新增权限功能开发中')
  }

  const handleEdit = (record: PermissionItem) => {
    message.info(`编辑权限: ${record.name}`)
  }

  const handleDelete = (record: PermissionItem) => {
    message.info(`删除权限: ${record.name}`)
  }

  const handleExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue)
  }

  const getTypeName = (type: number) => {
    switch (type) {
      case 1: return '菜单'
      case 2: return '按钮'
      case 3: return '接口'
      default: return '未知'
    }
  }

  const convertToTreeData = (data: PermissionItem[]): DataNode[] => {
    return data.map((item) => ({
      title: (
        <Space>
          <span>{item.name} ({item.code})</span>
          <span style={{ color: '#8c8c8c' }}>{getTypeName(item.type)}</span>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); handleEdit(item); }}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); handleDelete(item); }}>
            删除
          </Button>
        </Space>
      ),
      key: item.id,
      children: item.children ? convertToTreeData(item.children) : undefined,
    }))
  }

  return (
    <div className="permission-list">
      <div className="table-toolbar">
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增</Button>
        </Space>
      </div>

      <Tree
        treeData={convertToTreeData(dataSource)}
        expandedKeys={expandedKeys}
        onExpand={handleExpand}
      />
    </div>
  )
}

export default PermissionList
