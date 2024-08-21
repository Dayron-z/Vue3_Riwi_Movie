import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/pages/Home.vue'),
        name: 'home'
    },
    {
        //: --> variable dinamica
        path: '/movies/:id',
        component: () => import('@/pages/MovieDetails.vue'),
        name: 'movie-details'
    }
   
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;