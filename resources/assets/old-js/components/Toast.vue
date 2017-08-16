<template>
    <v-snackbar v-model="show" >
        {{ msg }}
        <v-btn flat class="pink--text" @click.native="dismiss">Close</v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        computed: {
            msg: function () {
                return this.$store.state.toast;
            },
            show: function () {
                return this.$store.getters.toastOn;
            }
        },
        methods: {
            dismiss: function () {
                this.$store.commit('setToast', '');
            },
        },
        created() {

        }
    }
</script>