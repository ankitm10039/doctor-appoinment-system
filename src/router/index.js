import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('user')
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)
    
    if (authRequired && !isAuthenticated) {
      next('/login')
    } else if (isAuthenticated && publicPages.includes(to.path)) {
      // Prevent authenticated users from accessing login/register pages
      next('/dashboard')
    } else {
      next()
    }
  })

  return Router
})
