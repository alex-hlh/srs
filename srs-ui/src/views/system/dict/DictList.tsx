import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag, Form, Input, Select, Modal, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { getDictList, deleteDict, type DictItem } from '@/api/system/dict'

const DictList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DictItem[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [searchForm] = Form.useForm()

  const columns: ColumnsType<DictItem> = [
    {
      title: '字典名称',
      dataIndex: 'dictName',
      width: 200,
    },
    {
      title: '字典编码',
      dataIndex: 'dictCode',
      width: 200,
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
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<FileTextOutlined />} onClick={() => handleViewData(record)}>
            字典数据
          </Button>
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
      const res = await getDictList(params)
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
    message.info('新增字典功能开发中')
  }

  const handleEdit = (record: DictItem) => {
    message.info(`编辑字典: ${record.dictName}`)
  }

  const handleViewData = (record: DictItem) => {
    message.info(`查看字典 ${record.dictName} 的数据项`)
  }

  const handleDelete = (record: DictItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定删除字典 ${record.dictName} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await deleteDict(record.id)
        message.success('删除成功')
        loadData()
      },
    })
  }

  return (
    <div className="dict-list">
      <Form form={searchForm} layout="inline" className="search-form">
        <Form.Item name="dictName" label="字典名称">
          <Input placeholder="请输入字典名称" allowClear style={{ width: 150 }} />
        </Form.Item>
        <Form.Item name="dictCode" label="字典编码">
          <Input placeholder="请输入字典编码" allowClear style={{ width: 150 }} />
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

export default DictList
