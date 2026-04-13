import axios from '@/utils/request'
import { md5 } from '@/utils/md5'

export function login(userInfo) {
  const data = {
    username: userInfo.username,
    password: md5(userInfo.password),
    captcha: userInfo.captcha || '',
    checkKey: userInfo.checkKey || ''
  }
  return axios.post('/sys/login', data)
}

export function logout() {
  return axios.post('/sys/logout')
}

export function getUserInfo() {
  return axios.get('/sys/user/getUserInfo')
}

export function getMenuByToken() {
  return axios.get('/sys/menu')
}
