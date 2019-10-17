import axios from '@/config/httpConfig'

// 登录
export function login(data) {
    return axios.post('/user/login', data)
}
// 内 获取区域
export function orgList(id) {
    return axios.get(`/statistics/orgList?orgId=${id}`)
}
// 内 数据总览
export function internalOverView(data) {
    return axios.post(`/statistics/internalOverView`, data)
}

// 内 各项指标排名
export function internalSortedOverView(data) {
    return axios.post(`/statistics/internalSortedOverView`, data)
}
// 内 派失原因占比
export function paidFailedReasons(data) {
    return axios.post(`/statistics/paidFailedReasons`, data)
}
// 内 跟进数据情况
export function getFllowingData(data) {
    return axios.post(`/statistics2/getFllowingData`, data)
}


export default {
    login,
    orgList,
    internalOverView,
    internalSortedOverView,
    paidFailedReasons,
    getFllowingData,
}