// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import VueRouter from 'vue-router'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueRouter)
// Vue.use(Express())
Vue.prototype.$http = Axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: Router,
    render: h => h(App)
})
