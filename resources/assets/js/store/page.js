export default {
    namespaced: true,
    state: {
        app: "Polaris",
        title: "",
        description: "",
        toast: "",
        loader: false,
    },
    mutations: {
        loader(state, loader) {
            state.loader = loader;
        },
        title(state, title) {
            state.title = title;
        },
        description(state, description) {
            state.description = description;
        },
        toast(state, text) {
            state.toast = text;
        },
    },
    actions: {
        dismissToast(state) {
            state.commit('toast', '');
        }
    },
    getters: {
        toastOn(state) {
            return state.toast !== '';
        }
    }
}
