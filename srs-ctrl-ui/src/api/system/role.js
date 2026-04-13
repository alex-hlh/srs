import axios from '@/utils/request'

export function roleList(params) {
  return axios.get('/sys/role/list', { params })
}

export function roleDetail(id) {
  return axios.get(`/sys/role/${id}`)
}

export function roleAdd(data) {
  return axios.post('/sys/role/add', data)
}

export function roleEdit(data) {
  return axios.put('/sys/role/edit', data)
}

export function roleDelete(id) {
  return axios.delete(`/sys/role/${id}`)
}

export function roleAuthorize(data) {
  return axios.put('/sys/role/authorize', data)
}
