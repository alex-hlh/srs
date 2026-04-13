<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>星环空间</h1>
        <p>智能管控平台</p>
      </div>
      <a-form
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="['username', { rules: [{ required: true, message: '请输入用户名' }] }]"
            placeholder="用户名"
            size="large"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
            type="password"
            placeholder="密码"
            size="large"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="['remember']">
            自动登录
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { md5 } from '@/utils/md5'

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...mapActions('user', ['Login']),
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const loginData = {
            username: values.username,
            password: md5(values.password)
          }
          this.Login(loginData)
            .then(() => {
              this.$message.success('登录成功')
              this.$router.push('/')
            })
            .catch(err => {
              this.$message.error(err.message || '登录失败')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
}

.login-form {
  .ant-form-item {
    margin-bottom: 20px;
  }
}
</style>
