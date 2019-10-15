import Vue from 'vue'
import App from '@/App'
import store from '@/store/index'
import router from '@/router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import axios from './config/httpConfig'
import * as globalFilter from './filters/filters'
import '@/icons'
import '@/router/permission'

Vue.prototype.$http = axios
// 创建事件总线
Vue.prototype.$EventBus = new Vue();

for (let key in globalFilter) {
    Vue.filter(key, globalFilter[key])
}

Vue.use(ElementUI)

// 阻止启动生产消息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
