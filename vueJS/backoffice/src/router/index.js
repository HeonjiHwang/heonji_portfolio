import { createWebHistory, createRouter } from "vue-router";

let routes = [
    {
        path:'/',
        name:'main',
        component : () => import('../CheckMain.vue')
    },
    {
        path:'/home',
        name:'mainHome',
        component : () => import('@/views/MainHome.vue')
    },
    {
        path:'/worldMap',
        name:'worldMap',
        component: () => import('@/views/WorldMap.vue')
    },
    {
        path:'/myPage',
        name:'MyPage',
        component: () => import('@/views/MyPage.vue')
    },
    {
        path:'/manageWeb',
        name:'ManageWeb',
        component: () => import('@/views/ManageWeb.vue')
    },
];

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
});

export default router;