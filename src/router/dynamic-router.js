/* 统计报表 */
const Statistical = () => import('@/pages/statistical-statement')
const StatisticalBusiness = () => import('@/pages/statistical-statement/statistical-business')
const StatisticalInside = () => import('@/pages/statistical-statement/statistical-inside')

/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/statistical',
        name: 'statistical',
        component: Statistical,
        meta: {
            name: '统计报表',
            icon: 'user'
        },
        children: [
            {
                path: 'business',
                name: 'statistical-business',
                component: StatisticalBusiness,
                meta: {
                    name: '商家报表',
                    icon: 'table'
                }
            },
            {
                path: 'inside',
                name: 'statistical-inside',
                component: StatisticalInside,
                meta: {
                    name: '内部报表',
                    icon: 'tree'
                }
            }
        ]
    },
]

export default dynamicRoutes
