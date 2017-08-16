import Vue from 'vue';
import Vuetify from 'vuetify'
import router from './router';
import store from './store';

Vue.use(Vuetify);

Vue.component('toolbar', require('./components/Toolbar'));
Vue.component('loader', require('./components/Loader'));
Vue.component('toast', require('./components/Toast'));

window.$ = window.jQuery = require('jquery');
require('velocity-animate');

const app = new Vue({
    el: '#app',
    router,
    store,
    computed: {
        route: function () {
            return this.$route;
        },
    },
    watch: {
        route: function() {
            let route = this.route;
            $(function() {

                let title = $('.page--title');
                let margin = 16;

                store.commit('page/loader', true);

                title.velocity({
                    opacity: 0,
                    marginLeft: margin + 25,
                }, 300, function() {
                    document.title = route.meta.title + ' - ' + route.meta.description;
                    store.commit('page/title', route.meta.title);
                    store.commit('page/description', route.meta.description);
                    title.velocity({
                        opacity: 1,
                        marginLeft: margin,
                    }, 300, function () {
                        store.commit('page/loader', false);
                    });
                });
            });
        }
    },
});
