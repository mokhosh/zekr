import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fa'
import 'element-ui/lib/theme-chalk/index.css'
import App from './components/App'

require('./bootstrap');
Vue.use(ElementUI, { locale });

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router
});
