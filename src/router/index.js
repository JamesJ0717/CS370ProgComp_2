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
            path: '/opcs/',
            name: 'Home',
            component: Home
        },
        {
            path: '/opcs/About',
            name: 'About',
            component: About
        },
        {
            path: '/opcs/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/opcs/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/opcs/register',
            name: 'Register',
            component: Register,
            meta: {}
        },
        {
            path: '/opcs/createComp',
            name: 'Create Comp',
            component: CreateComp,
            meta: {
                requiresAuth: true,
                is_host: true
            }
        },
        {
            path: '/opcs/competition',
            name: 'Competition',
            component: Competition,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/opcs/logout',
            name: 'Logout',
            component: Logout,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/opcs/updateComps',
            name: 'Update Comp',
            component: UpdateComp,
            meta: {
                requiresAuth: true,
                is_host: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/opcs/login',
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
