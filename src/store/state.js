export default {
    get UserInfo() {
        if (localStorage.getItem('UserInfo')) {
            return JSON.parse(localStorage.getItem('UserInfo'))
        }
    },
    set UserInfo(value) {
        localStorage.setItem('UserInfo', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
}
