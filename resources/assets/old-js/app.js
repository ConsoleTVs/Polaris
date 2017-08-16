import Vue from 'vue'
import Vuetify from 'vuetify'
import store from './store'
import Toast from './components/Toast.vue'
import Loader from './components/Loader.vue'
import Toolbar from './components/Toolbar.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

require('./initial_setup');

let router = require('./router');

Vue.use(Vuetify);
Vue.component('toast', Toast);
Vue.component('loader', Loader);
Vue.component('toolbar', Toolbar);

require('velocity-animate');

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });

const app = new Vue({
    store,
    router,
    el: '#app',
    beforeMount() {
        let app = document.head.querySelector('meta[name="app-name"]');
        store.commit('setApp', app.content);
        // Check if the user is logged in.
        this.axios.post('/api/authenticated').then((result) => {
            if (result.data.authenticated) {
                this.axios.post('/api/user').then((result) => {
                    store.commit('setUser', result.data.user);
                });
            }
        });
    }
});
