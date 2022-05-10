// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import i18n from '@/locale'
import store from '@/store/index.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  i18n,
  router,
  store,
  render: h => h(App) 
}).$mount('#app')
