import axios from 'axios'
import store from '@/store/index.js'
import baseURL from './baseUrl'
import { Message, Loading } from 'element-ui'
const http = {}

var instance = axios.create({
    baseURL,
    validateStatus(status) {
        Message.closeAll()
        switch (status) {
            case 400:
                Message.error('请求出错')
                break
            case 401:
                Message.warning({
                    message: '授权失败，请重新登录',
                    duration: 2000
                })
                store.commit('LOGIN_OUT')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                return
            case 403:
                Message.warning({
                    message: '拒绝访问',
                    duration: 2000
                })
                break
            case 404:
                Message.warning({
                    message: '请求错误,未找到该资源',
                    duration: 2000
                })
                break
            case 405:
                Message.warning({
                    message: '网络开小差！',
                    duration: 2000
                })
                break
            case 500:
                Message.warning({
                    message: '服务端错误',
                    duration: 2000
                })
                break
            default:
        }
        return status >= 200 && status < 300
    }
})

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 请求头添加token
        if (store.state.UserInfo) {
            config.headers["token"] = store.state.UserInfo.token
            config.headers["id"] = store.state.UserInfo.id;
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
            console.log(1);
        } else {
            err.message = '连接服务器失败'
        }
        // Message.error({
        //     message: err.message
        // })
        return Promise.reject(err.response)
    }
)

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.timeout = 30000; //请求30s超时

http.get = function (url, options) {
    /* let loading
    if (!options || options.isShowLoading !== false) {
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'block'
    } */
    let loadingInstance = Loading.service({
        text: '加载中...',
        background: 'rgba(0,0,0,0.5)'
    });
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
                /* if (!options || options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                } */
                loadingInstance.close();
                if (response.resultCode === 200) {
                    resolve(response)
                } else {
                    Message.error({
                        message: response.message,
                        duration: 2000
                    })
                    reject(response.message)
                }
            })
            .catch(e => {
                console.log(e)
                loadingInstance.close();
            })
    })
}

http.post = function (url, data, options) {
    /* let loading
    if (!options || options.isShowLoading !== false) {
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'block'
    } */
    let loadingInstance = Loading.service({
        text: '加载中...',
        background: 'rgba(0,0,0,0.5)'
    });
    return new Promise((resolve, reject) => {
        instance
            .post(url, data, options)
            .then(response => {
                /* if (!options || options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                } */
                loadingInstance.close();
                if (response.resultCode === 200) {
                    resolve(response)
                } else {
                    Message.error({
                        message: response.message,
                        duration: 2000
                    })
                    reject(response.message)
                }
            })
            .catch(e => {
                console.log(e)
                loadingInstance.close();
            })
    })
}

export default http
