import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Pages/Home.vue"
import Owner from "../components/Pages/Owner.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/owner',
        name: 'Owner',
        component: Owner,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router