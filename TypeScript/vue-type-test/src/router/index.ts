import {RouteRecordRaw, createWebHistory, createRouter} from 'vue-router';

const routes:Array<RouteRecordRaw> = [
    {
        path : '/',
        name : 'test',
        component : () => import('@/components/TestType.vue')
    },
    {
        path : '/home',
        name : 'home',
        component : () => import('@/components/MainHome.vue')
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes,
});

export default router;