<template>
    <v-snackbar v-model="show" :timeout="0">
        {{ msg }}
        <v-btn flat class="pink--text" @click.native="dismiss">Close</v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        computed: {
            msg: function () {
                return this.$store.state.page.toast;
            },
            show: {
                get: function () {
                    return this.$store.getters['page/toastOn'];
                },
                set: function(value) {
                    this.$store.dispatch('page/dismissToast');
                },
            }
        },
        methods: {
            dismiss: function () {
                this.$store.dispatch('page/dismissToast');
            },
        },
        created() {

        }
    }
</script>
