import axios from '@/utils/request'

export function userList(params) {
  return axios.get('/sys/user/list', { params })
}

export function userDetail(id) {
  return axios.get(`/sys/user/${id}`)
}

export function userAdd(data) {
  return axios.post('/sys/user/add', data)
}

export function userEdit(data) {
  return axios.put('/sys/user/edit', data)
}

export function userDelete(id) {
  return axios.delete(`/sys/user/${id}`)
}

export function userExport(params) {
  return axios.get('/sys/user/export', { params })
}

export function userImport(data) {
  return axios.post('/sys/user/import', data)
}

export function resetPassword(id) {
  return axios.put('/sys/user/resetPwd', { id })
}
