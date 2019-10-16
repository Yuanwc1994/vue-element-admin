export default {
    get UserInfo() {
        if (localStorage.getItem('UserInfo')) {
            return JSON.parse(localStorage.getItem('UserInfo'))
        }
        /* return {
            token: "aa69f8c6187449f5a502e7765147812657",
            id: "6234",
            roleCode: "clerk",
            userName: "东鹏瓷砖(海南儋州美扶建材市场店)",
            toux: "https://dpmall-product.oss-cn-shenzhen.aliyuncs.com/zhuxiaobaoImg/wode_touxiang@2x.png",
        } */
    },
    set UserInfo(value) {
        localStorage.setItem('UserInfo', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: true,
    /* 面包屑导航列表 */
    crumbList: []
}
