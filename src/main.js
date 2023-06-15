import Vue from 'vue'
import App from './App.vue'

import store from './store'

import router from './router'
import VueRouter from "vue-router"
Vue.use(VueRouter)

import * as echarts from 'echarts'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

import * as API from './api'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API;
    Vue.prototype.$echarts = echarts

    // Vue.prototype.$qs = qs
  },
  render: h => h(App),
}).$mount('#app')
