<template>
  <a-modal
    :visible="visible"
    :title="isEdit ? '编辑用户' : '新增用户'"
    :confirm-loading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
    width="600px"
  >
    <a-form
      ref="form"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="用户名" has-feedback>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: '请输入用户名' },
                { min: 3, max: 20, message: '用户名长度为3-20个字符' }
              ]
            }
          ]"
          placeholder="请输入用户名"
          :disabled="isEdit"
        />
      </a-form-item>

      <a-form-item label="真实姓名">
        <a-input
          v-decorator="[
            'realname',
            { rules: [{ required: true, message: '请输入真实姓名' }] }
          ]"
          placeholder="请输入真实姓名"
        />
      </a-form-item>

      <a-form-item v-if="!isEdit" label="密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' }
              ]
            }
          ]"
          type="password"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item label="手机号">
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
              ]
            }
          ]"
          placeholder="请输入手机号"
        />
      </a-form-item>

      <a-form-item label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                { type: 'email', message: '请输入正确的邮箱格式' }
              ]
            }
          ]"
          placeholder="请输入邮箱"
        />
      </a-form-item>

      <a-form-item label="状态">
        <a-select
          v-decorator="['status', { initialValue: 1 }]"
          placeholder="请选择状态"
        >
          <a-select-option :value="1">正常</a-select-option>
          <a-select-option :value="2">冻结</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'UserModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  watch: {
    visible(val) {
      if (val && this.record) {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            username: this.record.username,
            realname: this.record.realname,
            phone: this.record.phone,
            email: this.record.email,
            status: this.record.status
          })
        })
      } else if (val) {
        this.$nextTick(() => {
          this.form.resetFields()
        })
      }
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('ok', {
            id: this.record?.id,
            ...values
          })
        }
      })
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
