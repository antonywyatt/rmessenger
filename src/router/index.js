import { createRouter, createWebHistory } from 'vue-router'

import isLogout from './isLogout'
import isLogin from './isLogin'

import homeRouter from '../modules/home/router'
import authRouter from '../modules/auth/router'

const routes = [
    {
        path: '/',
        name: 'home',
        ...homeRouter,
        beforeEnter: [ isLogin ]
    },
    {
        path: '/auth',
        name: 'auth',
        ...authRouter,
        beforeEnter: [ isLogout ]
    }
    // {
    //     path: "/:pathMatch(.*)", 
    //     component: PageNotFound 
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

export default router