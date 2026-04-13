import React, { useState, useEffect } from 'react'
import { Tree, Button, Space, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree'
import { getDepartmentTree, type DepartmentItem } from '@/api/system/department'

const DepartmentList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DepartmentItem[]>([])
  const [, setLoading] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await getDepartmentTree()
      if (res.success && res.data) {
        setDataSource(res.data || [])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    message.info('新增部门功能开发中')
  }

  const handleEdit = (record: DepartmentItem) => {
    message.info(`编辑部门: ${record.name}`)
  }

  const handleDelete = (record: DepartmentItem) => {
    message.info(`删除部门: ${record.name}`)
  }

  const handleExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue)
  }

  const convertToTreeData = (data: DepartmentItem[]): DataNode[] => {
    return data.map((item) => ({
      title: (
        <Space>
          <span>{item.name}</span>
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
    <div className="department-list">
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

export default DepartmentList
