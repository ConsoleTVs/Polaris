import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import Welcome from './components/Welcome.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter);

const router = new VueRouter ({
    mode: 'history',
    routes: [
        {
            path: '/', name: 'index', component: Welcome,
            meta: {
                title: document.head.querySelector('meta[name="app-name"]').content,
                description: 'The modern URL platform',
                auth: null,
            }
        },
        {
            path: '/login', name: 'login', component: Login,
            meta: {
                title: 'Login',
                description: 'Access to your account',
                auth: false,
            }
        },
        {
            path: '/dashboard', name: 'dashboard', component: Welcome,
            meta: {
                title: 'Dashboard',
                description: 'Application dashboard',
                auth: true,
            }
        },
    ]
});

Vue.router = router;
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

router.beforeEach((to, from, next) => {
    // Update the CSRF token
    let token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    // Check authentication guard
    if ((to.meta.auth && $auth.check()) || to.meta.auth === false || to.meta.auth == null) {
        // Change application title and subtitle
        let title = $('.title');
        let margin = 16;
        store.commit('setLoader', true);
        title.velocity({
            opacity: 0,
            marginLeft: margin + 25,
        }, 300, function() {
            store.commit('setTitle', to.meta.title);
            store.commit('setDescription', to.meta.description);
            title.velocity({
                opacity: 1,
                marginLeft: margin,
            }, 300, function () {
                store.commit('setLoader', false);
            });
        });
        next();
    }
});

export default router;
