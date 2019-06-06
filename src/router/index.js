import Router from 'vue-router'
import About from '@/components/About'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import CreateComp from '@/components/DashComponents/HostDash/CreateComp'
import Competition from '@/components/CompetitionComponents/Competition'
import Logout from '@/components/Logout'
import UpdateComp from '@/components/DashComponents/HostDash/UpdateComp'

let router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/About',
            name: 'About',
            component: About
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
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
            path: '/createComp',
            name: 'Create Comp',
            component: CreateComp,
            meta: {
                requiresAuth: true,
                is_host: true
            }
        },
        {
            path: '/competition',
            name: 'Competition',
            component: Competition,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/updateComps',
            name: 'Update Comp',
            component: UpdateComp,
            meta: {
                requiresAuth: true,
                is_host: true
            }
        },
        {
            path: '*',
            name: 'Home',
            component: Home
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
            if (to.matched.some(record => record.meta.is_host)) {
                if (user.is_host == 1) {
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
            localStorage.removeItem('jwt')
            next({
                name: 'Login'
            })
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
