export default {
    LOGIN_IN(state, info) {
        state.UserInfo = info
    },
    LOGIN_OUT(state) {
        state.UserInfo = ''
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    }
}
