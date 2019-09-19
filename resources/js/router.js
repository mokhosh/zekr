import Vue from 'vue'
import VueRouter from 'vue-router'
import QuranViewer from "./components/QuranViewer";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Login from "./components/Login";

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { path: '/', component: QuranViewer },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/logout', component: Logout }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    let isGuest = ! localStorage.getItem('access_token');
    let onGuestPages = to.path === '/login' || to.path === '/register';

    if (isGuest && ! onGuestPages) {
        console.log('must log in');
        next('/login');
    } else if (! isGuest && onGuestPages) {
        next('/');
    } else {
        next();
    }
});

export default router;
