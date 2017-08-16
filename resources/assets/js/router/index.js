import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import routes from './routes';
import store from '../store';
import auth from './auth';

Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    mode: 'history',
});

axios.defaults.baseURL = 'http://polaris.dev';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(function (config) {
    store.commit('page/loader', true);
    return config;
}, function (error) {
    store.commit('page/loader', false);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    store.commit('page/loader', false);
    return response;
}, function (error) {
    store.commit('page/loader', false);
    return Promise.reject(error);
});

Vue.router = router;
Vue.use(VueAxios, axios)
Vue.use(VueAuth, auth);

export default router;
