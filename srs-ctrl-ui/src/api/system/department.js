import axios from '@/utils/request'

export function departmentList() {
  return axios.get('/sys/department/list')
}

export function departmentTree() {
  return axios.get('/sys/department/tree')
}

export function departmentDetail(id) {
  return axios.get(`/sys/department/${id}`)
}

export function departmentAdd(data) {
  return axios.post('/sys/department/add', data)
}

export function departmentEdit(data) {
  return axios.put('/sys/department/edit', data)
}

export function departmentDelete(id) {
  return axios.delete(`/sys/department/${id}`)
}

export function departmentSync() {
  return axios.post('/sys/department/sync')
}
