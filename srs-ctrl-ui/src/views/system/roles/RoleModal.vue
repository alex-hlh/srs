<template>
  <a-modal
    :visible="visible"
    :title="isEdit ? '编辑角色' : '新增角色'"
    :confirm-loading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
    width="500px"
  >
    <a-form
      ref="form"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="角色名称" has-feedback>
        <a-input
          v-decorator="[
            'roleName',
            { rules: [{ required: true, message: '请输入角色名称' }] }
          ]"
          placeholder="请输入角色名称"
        />
      </a-form-item>

      <a-form-item label="角色编码" has-feedback>
        <a-input
          v-decorator="[
            'roleCode',
            {
              rules: [
                { required: true, message: '请输入角色编码' },
                { pattern: /^[A-Z_]+$/, message: '角色编码只能包含大写字母和下划线' }
              ]
            }
          ]"
          placeholder="请输入角色编码"
          :disabled="isEdit"
        />
      </a-form-item>

      <a-form-item label="描述">
        <a-textarea
          v-decorator="['description']"
          placeholder="请输入描述"
          :rows="4"
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
  name: 'RoleModal',
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
            roleName: this.record.roleName,
            roleCode: this.record.roleCode,
            description: this.record.description,
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
