import Index from '../views/Index.vue'
import Chat from '../pages/Chat.vue'


export default {
    name: 'home',
    component: () => import('../views/Layout.vue'),
    children: [
        {
            name: 'home',
            path: '/',
            component: Index
        },
        {
            name: 'chat',
            path: '/:chat_id',
            component: Chat
        }
    ],
}