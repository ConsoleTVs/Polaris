import axios from 'axios';

export default {
    namespaced: true,
    state: {
        links: [],
        totalViews: 0,
    },
    mutations: {
        links(state, value) {
            state.links = value;
        },
        totalViews(state, value) {
            state.totalViews = value;
        }
    },
    actions: {
        updateLinks(state) {
            return new Promise((resolve, reject) => {
                axios.get('api/links').then((response) => {
                    state.commit('links', response.data);
                    resolve();
                });
            });
        },
        updateViews(state) {
            return new Promise((resolve, reject) => {
                axios.get('api/links/total_views').then((response) => {
                    state.commit('totalViews', response.data.views);
                    resolve();
                });
            });
        }
    },
    getters: {
        linksCount(state) {
            return state.links.length;
        },
    }
}
