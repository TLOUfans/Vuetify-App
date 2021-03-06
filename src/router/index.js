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
      name: 'List',
      component: () => import('../components/List')
    },
    {
      path: '/EngFormST',
      name: 'EngFormST',
      component: () => import('../components/eng/FormST')
    },
    {
      path: '/EngFormND',
      name: 'EngFormND',
      component: () => import('../components/eng/FormND')
    },
    {
      path: '/EngFormRD',
      name: 'EngFormRD',
      component: () => import('../components/eng/FormRD')
    }
  ]
})
