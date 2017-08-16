import store from './store';
import axios from 'axios'

window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.interceptors.request.use(function (config) {
    store.commit('setLoader', true);
    return config;
}, function (error) {
    store.commit('setLoader', false);
    return Promise.reject(error);
});

window.axios.interceptors.response.use(function (response) {
    store.commit('setLoader', false);
    return response;
}, function (error) {
    store.commit('setLoader', false);
    return Promise.reject(error);
});