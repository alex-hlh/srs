import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import type { UserItem } from '@/api/system/user'
import { addUser, updateUser } from '@/api/system/user'

interface UserModalProps {
  visible: boolean
  isEdit: boolean
  record: UserItem | null
  onOk: () => void
  onCancel: () => void
}

const UserModal: React.FC<UserModalProps> = ({ visible, isEdit, record, onOk, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (visible && record) {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
  }, [visible, record])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      try {
        if (isEdit && record) {
          await updateUser({ ...values, id: record.id })
          message.success('编辑成功')
        } else {
          await addUser(values)
          message.success('新增成功')
        }
        onOk()
      } finally {
        setLoading(false)
      }
    } catch (error) {
      console.error('Form validation failed:', error)
    }
  }

  return (
    <Modal
      title={isEdit ? '编辑用户' : '新增用户'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="realName"
          label="真实姓名"
          rules={[{ required: true, message: '请输入真实姓名' }]}
        >
          <Input placeholder="请输入真实姓名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: !isEdit, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="phone" label="手机号">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="status" label="状态" initialValue={1}>
          <Select>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>冻结</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
