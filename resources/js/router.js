import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Logout from "./views/Logout";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isGuest = !localStorage.getItem('access_token');
    const onGuestPages = to.path === '/login' || to.path === '/register';

    if (isGuest && !onGuestPages) {
        next('/login');
    } else if (!isGuest && onGuestPages) {
        next('/');
    } else {
        next();
    }
});

export default router;
