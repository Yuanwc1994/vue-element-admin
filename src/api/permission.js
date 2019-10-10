import axios from '@/config/httpConfig'

// 登录
export function login(data) {
    return axios.post('/user/login', data)
}
