/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './app'
import fase from 'fansion-base'
import ElementUI from 'element-ui'
import fac from 'fansion-fac'
import fanui from 'fansion-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './reset.css'
import home from './home'
const comp = require(process.env.entry)
if (!window.$restContext) {
  window.$restContext = process.env.contextPath || '/oflane'
}

Vue.use(ElementUI)
Vue.use(fac)
Vue.use(fanui)
Vue.use(comp)
Vue.config.productionTip = false
window.vue = Vue
fase.init({
  pages: {
    pages: {
      '/index': home
    }
  },
  routes: [
    '/->!/index',
    '/index'
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: fase.route.getRouter(),
  template: '<app/>',
  components: { app },
  render: h => h(app)
})
