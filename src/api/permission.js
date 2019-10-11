import axios from '@/config/httpConfig'

// 登录
export function login(data) {
    return axios.post('/user/login', data)
}
// 登录
export function orgList(id) {
    return axios.get(`/statistics/orgList?orgId=${id}`)
}

export default {
    login,
    orgList
}