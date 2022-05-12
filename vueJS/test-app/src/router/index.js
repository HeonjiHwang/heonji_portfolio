import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path:"/",
        name:"MainHome",
        component:()=>import('@/components/MainHome')
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;