import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/login'
import NotFound from '@/pages/errorPage/404'
import Forbidden from '@/pages/errorPage/403'
import Layout from '@/pages/layout/index'
import Home from '@/pages/home/index'


/* 统计报表 */
const Statistical = () => import('@/pages/statistical-statement')
const StatisticalBusiness = () => import('@/pages/statistical-statement/statistical-business')
const StatisticalInside = () => import('@/pages/statistical-statement/statistical-inside')

Vue.use(Router)

/* 初始路由 */
export default new Router({
    routes: [
        {
            path: '/login',
            component: Login
        }
    ]
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        name: 'container',
        component: Layout,
        redirect: 'home',
        meta: {
            requiresAuth: true,
            name: '首页'
        },
        children: [
            {
                id: 1,
                path: 'home',
                component: Home,
                name: 'home',
                meta: {
                    name: '首页',
                    icon: 'tree'
                }
            }
        ]
    },
    {
        path: '/403',
        component: Forbidden
    },
    {
        path: '*',
        component: NotFound
    },
    /* {
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
    }, */
]
