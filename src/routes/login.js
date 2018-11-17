import Router from 'vue-router'
import Vue from 'vue'
import Login from '../components/Login.vue'

Vue.use(Router)


function login(req, res) {
    let email = req.body.email
    let password = req.body.password
    console.log(email, password)
}
