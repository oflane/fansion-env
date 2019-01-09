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
  window.$restContext = process.env.contextPath
}
if (!window.$routeLoader) {
  window.$routeLoader = process.env.routeLoader
}
Vue.use(ElementUI)
Vue.use(fac)
Vue.use(fanui)
Vue.use(fase.mod.module(comp))

Vue.config.productionTip = false
// 动态路由加载url
const routeLoader = window.$routeLoader ? fase.rest.getJson(window.$routeLoader).then(res => Array.isArray(res) ? res.map(v => '$' + v) : []) : null
window.vue = Vue
fase.init({
  pages: {
    pageComps: {
      '/index': home
    }
  },
  routes: [
    '/->!/index',
    '/index'
  ],
  routeLoader
})
/* eslint-disable no-new */
let root = new Vue({
  el: '#app',
  router: fase.route.getRouter(),
  template: '<app/>',
  components: { app },
  render: h => h(app)
})
fase.util.setMessageComp(msg => {
  root.$msg(msg)
})
