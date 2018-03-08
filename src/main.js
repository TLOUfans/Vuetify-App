// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueIconFont from 'vue-icon-font';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

Vue.use(Vuetify);
Vue.use(VueIconFont);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App: () => import('./App')
  },
  template: '<App/>'
})