import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag, Form, Input, Select, Modal, message } from 'antd'
import { PlusOutlined, ExportOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { getRoleList, deleteRole, type RoleItem } from '@/api/system/role'

const RoleList: React.FC = () => {
  const [dataSource, setDataSource] = useState<RoleItem[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [searchForm] = Form.useForm()

  const columns: ColumnsType<RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'error'}>
          {status === 1 ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const values = searchForm.getFieldsValue()
      const params = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...values,
      }
      const res = await getRoleList(params)
      if (res.success && res.data) {
        setDataSource(res.data.records || [])
        setPagination((prev) => ({ ...prev, total: res.data!.total }))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTableChange = (paginationConfig: any) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }))
    loadData()
  }

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }))
    loadData()
  }

  const handleReset = () => {
    searchForm.resetFields()
    handleSearch()
  }

  const handleAdd = () => {
    message.info('新增角色功能开发中')
  }

  const handleEdit = (record: RoleItem) => {
    message.info(`编辑角色: ${record.name}`)
  }

  const handleDelete = (record: RoleItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定删除角色 ${record.name} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await deleteRole(record.id)
        message.success('删除成功')
        loadData()
      },
    })
  }

  const handleExport = () => {
    message.info('导出功能开发中')
  }

  return (
    <div className="role-list">
      <Form form={searchForm} layout="inline" className="search-form">
        <Form.Item name="name" label="角色名称">
          <Input placeholder="请输入角色名称" allowClear style={{ width: 150 }} />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态" allowClear style={{ width: 150 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>禁用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className="data-table">
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增</Button>
          <Button icon={<ExportOutlined />} onClick={handleExport}>导出</Button>
        </Space>

        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey="id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  )
}

export default RoleList
