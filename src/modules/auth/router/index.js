import Index from '../views/Index.vue'


export default {
    name: 'auth',
    component: () => import('../views/Layout.vue'),
    children: [
        {
            name: 'auth',
            path: '/auth',
            component: Index
        }
    ],
}