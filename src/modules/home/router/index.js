import Index from '../views/Index.vue'


export default {
    name: 'home',
    component: () => import('../views/Layout.vue'),
    children: [
        {
            name: 'home',
            path: '/',
            component: Index
        }
    ],
}