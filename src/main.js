// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueIconFont from 'vue-icon-font'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/font/iconfont.css'
import './assets/font/index.css'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.use(VueIconFont);

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

router.beforeEach((to, form, next) => {
  if (to.path !== '/') {
    if (store.state.app.formTitle) next();
    else next('/');
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App: () => import('./App')
  },
  template: '<App/>'
})
