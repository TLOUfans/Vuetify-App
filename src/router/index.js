import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home')
    },
    {
      path: '/List',
      name: 'NpWin',
      component: () => import('../components/List')
    }
  ]
})
