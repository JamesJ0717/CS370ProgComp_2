import VueRouter from 'vue-router'
import Splash from '@/components/Splash'
import Login from '@/components/Login'
import About from '@/components/About'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'

let router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Splash',
            component: Splash
        }, {
            path: '/about',
            name: 'About',
            component: About,
            meta: {
                guest: true
            }
        }, {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: {
                    nextUrl: to.fullPath
                }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                } else {
                    next({
                        name: 'Dashboard'
                    })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({
                name: 'Register'
            })
        }
    } else {
        next()
    }
})

export default router
