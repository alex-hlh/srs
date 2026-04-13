import axios from '@/utils/request'

export function permissionList() {
  return axios.get('/sys/permission/list')
}

export function permissionTree() {
  return axios.get('/sys/permission/tree')
}

export function permissionAdd(data) {
  return axios.post('/sys/permission/add', data)
}

export function permissionEdit(data) {
  return axios.put('/sys/permission/edit', data)
}

export function permissionDelete(id) {
  return axios.delete(`/sys/permission/${id}`)
}
