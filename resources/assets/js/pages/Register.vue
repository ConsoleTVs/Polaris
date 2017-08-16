<template>
    <div class="center">
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-text-field
                        label="Full name"
                        class="mt-1"
                        v-model="name"
                        :error-messages="name_errors"
                        autofocus
                        required
                ></v-text-field>
                <v-text-field
                        label="Account Email"
                        class="mt-1"
                        v-model="email"
                        :error-messages="email_errors"
                        required
                ></v-text-field>
                <v-text-field
                        label="Account Password"
                        class="mt-1"
                        v-model="password"
                        :error-messages="password_errors"
                        type="password"
                        required
                ></v-text-field>
                <v-text-field
                        label="Account Password"
                        class="mt-1"
                        v-model="password_confirmation"
                        :error-messages="password_confirmation_errors"
                        type="password"
                        required
                ></v-text-field>
                <v-btn primary @click="register">Register</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                context: 'login context',
                name: '',
                name_errors: [],
                email: '',
                email_errors: [],
                password: '',
                password_errors: [],
                password_confirmation: '',
                password_confirmation_errors: [],
            }
        },
        methods: {
            register() {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                };
                this.name_errors = [];
                this.email_errors = [];
                this.password_errors = [];
                this.$auth.register({
                    body: data,
                    data: data,
                    autoLogin: false,
                    success(response) {
                        this.$store.commit('page/toast', response.data.msg);
                    },
                    error(error) {
                        if (error.response.status === 422) {
                            this.name_errors = error.response.data.name;
                            this.email_errors = error.response.data.email;
                            this.password_errors = error.response.data.password;
                            this.password_confirmation_errors = error.response.data.password_confirmation;
                            this.$store.commit('page/toast', "There are errors in the form");
                        } else {
                            this.$store.commit('page/toast', 'Unknown error');
                        }
                    }
                });
            },
        }
    }
</script>
