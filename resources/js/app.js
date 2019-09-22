import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue'
import store from './store';
import router from './router'
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import App from './components/App'

require('./bootstrap');

const app = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
