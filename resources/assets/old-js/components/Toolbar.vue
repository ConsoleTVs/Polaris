<template>
    <v-toolbar dark class="primary elevation-0" extended>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>{{ this.$store.state.app }}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
    export default {
        props: ['app'],
        data () {
            return {
                items: [
                    { title: 'Home', icon: 'dashboard', auth: false },
                    { title: 'About', icon: 'question_answer', auth: false },
                    { title: 'Login', icon: 'question_answer', auth: false },
                    { title: 'Register', icon: 'question_answer', auth: false },
                    { title: 'Panel', icon: 'question_answer', auth: true },
                    { title: 'All', icon: 'question_answer' }
                ],
            }
        },
        computed: {
            navItems: function () {
                return this.items.filter((item) => {
                    return ((item.auth === undefined || item.auth === null) || item.auth === this.$store.getters.authenticated);
                });
            }
        },
    }
</script>
