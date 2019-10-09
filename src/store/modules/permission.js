import { fetchPermission } from '@/api/permission'
import router, { DynamicRoutes } from '@/router/index'
import { recursionRouter } from '@/utils/recursion-router'
import dynamicRouter from '@/router/dynamic-router'

export default {
    namespaced: true,
    state: {
        permissionList: null /** 所有路由 */,
        sidebarMenu: [] /** 导航菜单 */,
        currentMenu: '' /** 当前active导航菜单 */,
        control_list: [] /** 完整的权限列表 */,
        avatar: ''/** 头像 */,
        account: ''/** 用户角色 */
    },
    getters: {},
    mutations: {
        SET_AVATAR(state, avatar) {
            state.avatar = avatar
        },
        SET_ACCOUNT(state, account) {
            state.account = account
        },
        SET_PERMISSION(state, routes) {
            state.permissionList = routes
        },
        CLEAR_PERMISSION(state) {
            state.permissionList = null
        },
        SET_MENU(state, menu) {
            state.sidebarMenu = menu
        },
        CLEAR_MENU(state) {
            state.sidebarMenu = []
        },
        SET_CURRENT_MENU(state, currentMenu) {
            state.currentMenu = currentMenu
        },
        SET_CONTROL_LIST(state, list) {
            state.control_list = list
        }
    },
    actions: {
        FETCH_PERMISSION({ commit, state }) {
            let userInfo = JSON.parse(localStorage.getItem('UserInfo'))
            console.log('获取客户信息userInfo', userInfo);
            let permissionList = {
                avatar: userInfo.toux || "https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoImg/wode_touxiang@2x.png",
                name: userInfo.userName,
                roles: [userInfo.roleCode],
                data: [
                    "order-manage",
                    "order-list",
                    "product-manage",
                    "product-list",
                    "review-manage",
                    "return-goods",
                    "goods",
                    "goods-list",
                    "goods-classify",
                    "permission",
                    "user-manage",
                    "role-manage",
                    "menu-manage"
                ]
            }
            console.log('permissionList', permissionList);
            commit('SET_AVATAR', permissionList.avatar) // 设置头像
            commit('SET_ACCOUNT', permissionList.name) // 设置名称
            let routes = recursionRouter(permissionList.data, dynamicRouter)
            console.log('routes', routes);
            let MainContainer = DynamicRoutes.find(v => v.path === '')
            console.log('DynamicRoutes', DynamicRoutes);
            console.log('MainContainer', MainContainer);
            let children = MainContainer.children
            console.log('children', children);
            commit('SET_CONTROL_LIST', [...children, ...dynamicRouter])
            children.push(...routes)
            console.log('children1', children);
            commit('SET_MENU', children)
            let initialRoutes = router.options.routes
            router.addRoutes(DynamicRoutes)
            console.log(router);
            commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
        }
    }
}
