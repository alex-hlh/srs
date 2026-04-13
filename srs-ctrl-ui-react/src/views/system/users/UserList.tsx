import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag, Form, Input, Select, Modal, message } from 'antd'
import { PlusOutlined, ExportOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { getUserList, deleteUser, resetPassword, type UserItem } from '@/api/system/user'
import UserModal from './UserModal'

const UserList: React.FC = () => {
  const [dataSource, setDataSource] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [searchForm] = Form.useForm()
  const [modalVisible, setModalVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<UserItem | null>(null)

  const columns: ColumnsType<UserItem> = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 120,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'error'}>
          {status === 1 ? '正常' : '冻结'}
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
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
          <Button type="link" size="small" icon={<ReloadOutlined />} onClick={() => handleResetPassword(record)}>
            重置密码
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
      const res = await getUserList(params)
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
    setCurrentRecord(null)
    setIsEdit(false)
    setModalVisible(true)
  }

  const handleEdit = (record: UserItem) => {
    setCurrentRecord(record)
    setIsEdit(true)
    setModalVisible(true)
  }

  const handleDelete = (record: UserItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定删除用户 ${record.username} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await deleteUser(record.id)
        message.success('删除成功')
        loadData()
      },
    })
  }

  const handleResetPassword = (record: UserItem) => {
    Modal.confirm({
      title: '确认重置',
      content: `确定重置用户 ${record.username} 的密码吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await resetPassword(record.id)
        message.success('密码已重置为默认密码')
      },
    })
  }

  const handleExport = () => {
    message.info('导出功能开发中')
  }

  const handleModalOk = () => {
    setModalVisible(false)
    loadData()
  }

  return (
    <div className="user-list">
      <Form form={searchForm} layout="inline" className="search-form">
        <Form.Item name="username" label="用户名">
          <Input placeholder="请输入用户名" allowClear style={{ width: 150 }} />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态" allowClear style={{ width: 150 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>冻结</Select.Option>
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

      <UserModal
        visible={modalVisible}
        isEdit={isEdit}
        record={currentRecord}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  )
}

export default UserList
