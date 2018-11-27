// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import VueRouter from 'vue-router'
import Axios from 'axios'
import SweetAlert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

Vue.use(VueRouter)
// Vue.use(Express())
Vue.prototype.$http = Axios
//Allow the rest of the web app to use sweetalert2
Vue.use(SweetAlert2)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: Router,
    render: h => h(App)
})
