import Vue from 'vue';
import Vuetify, {VSnackbar, VBtn, VIcon} from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';
import fa from 'vuetify/es5/locale/fa';

Vue.use(Vuetify, {
    components: {
        VSnackbar,
        VBtn,
        VIcon
    }
});
Vue.use(VuetifyToast);

export default new Vuetify({
    lang: {
        locales: {fa},
        current: 'fa',
    },
    theme: {
        themes: {
            light: {
                primary: '#3e64ff',
                secondary: '#5edfff',
                accent: '#042f4b',
                error: '#f76262',
                warning: '#ffc107',
                info: '#b2fcff',
                success: '#08ffc8',
                lightBg: '#ecfcff',
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },
    rtl: true,
});
