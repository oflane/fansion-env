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
import './reset.css'
import './app.less'
import home from './home'
import VueRouter from 'vue-router'
const comp = require(process.env.entry)
if (!window.$restContext) {
  window.$restContext = process.env.contextPath
}
if (!window.$routeLoader) {
  window.$routeLoader = process.env.routeLoader
}
if (!window.$urlsLoader) {
  window.$urlsLoader = process.env.urlsLoader
}
Vue.use(ElementUI)
Vue.use(fac)
Vue.use(fanui)
Vue.use(fase.mod.module(comp))
Vue.use(VueRouter)

Vue.config.productionTip = false
// 动态路由加载url
const routeLoader = window.$routeLoader || '/fac/routes'
const urlsLoader = window.$urlsLoader
window.vue = Vue
fase.init({
  rest: {
    baseURL: window.$restContext
  }
})
Promise.all([fase.rest.gson(routeLoader), fase.rest.gson(urlsLoader)]).then(reses =>{
  fase.init({
    pages: {
      pageComps: {
        '/index': home
      }
    },
    router: {
      routes: [
        '/->!/index',
        '/index',
        ... reses[0]
      ],
      routeLoader
    },
    urls: {
      urls: reses[1]
    }
  })
  /* eslint-disable no-new */
  const root = new Vue({
    el: '#app',
    router: fase.route.getRouter(),
    store: fase.store.getStore(),
    template: '<app/>',
    components: { app },
    render: h => h(app)
  })
  fase.util.setMessageComp(msg => {
    root.$message(msg)
  })
  fase.plugin.clearInstallCache()
})


