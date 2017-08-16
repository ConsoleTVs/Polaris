import Vue from 'vue';
import Vuex from 'vuex';
import page from './page';
import links from './links';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        page,
        links,
    },
});

export default store;
