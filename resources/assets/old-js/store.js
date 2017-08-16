import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let _ = require('lodash');

const store = new Vuex.Store({
    state: {
        app: "",
        color: "indigo",
        title: "",
        description: "",
        toast: "",
        loader: false,
        user: {},
    },
    getters: {
        authenticated(state) {
            return !(_.isEmpty(state.user));
        },
        toastOn(state) {
            return state.toast !== "";
        },
    },
    mutations: {
        setApp(state, name) {
            state.app = name;
        },
        setDescription(state, description) {
            document.title = state.title + " - " + description;
            state.description = description;
        },
        setTitle(state, title) {
            document.title = title + " - " + state.description;
            state.title = title;
        },
        setUser(state, user) {
            state.user = user;
        },
        setToast(state, msg) {
            state.toast = msg;
        },
        setLoader(state, loader) {
            state.loader = loader;
        }
    }
});

export default store;