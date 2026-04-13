export interface User {
  id: string
  username: string
  realName: string
  avatar?: string
  roles: string[]
  permissions: string[]
}

export interface LoginParams {
  username: string
  password: string
  captcha?: string
  checkKey?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface MenuItem {
  path: string
  name: string
  component?: string
  meta: {
    title: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
  }
  children?: MenuItem[]
}
