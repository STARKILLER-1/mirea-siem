import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import useApp from "../store/app";
const { currentHost } = useApp()
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        redirect: '/connect',
    },
    {
        path: '/connect',
        name: 'connect',
        component: () => import('../views/ConnectPage/ConnectPage.vue'),
        meta: {
            requiresHost: false
        }
    },
    {
        path: '/scripts',
        name: 'scripts',
        component: () => import('../views/ScriptsPage/ScriptsPage.vue'),
        meta: {
            requiresHost: true
        }
    },
    {
        path: '/incidents',
        name: 'incidents',
        component: () => import('../views/IncidentsPage/IncidentsPage.vue'),
        meta: {
            requiresHost: true
        }
    },
    /*{
        path: '/recommendations',
        name: 'recommendations',
        component: () => import('../views/RecommendationsPage/Recommendations.vue'),
        meta: {
            requiresHost: true
        }
    },*/
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresHost && !currentHost.value) {
        next({name: 'connect'})
    }
    next()
})

export default router