import router from '@/router/index'
import store from '@/store/index'

router.beforeEach((to, from, next) => {
  if (!store.state.UserInfo) {
      if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
          next()
      } else {
          next({ path: '/login' })
      }
  } else {
      if (!store.state.permission.permissionList) {
          store.dispatch('permission/FETCH_PERMISSION').then(() => {
              next({ path: to.path })
          })
      } else {
          if (to.path !== '/login') {
              next()
          } else {
              next(from.fullPath)
          }
      }
  }
})

router.afterEach((to, from, next) => {
  let routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})