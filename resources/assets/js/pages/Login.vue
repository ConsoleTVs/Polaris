<template>
    <div class="center">
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-text-field
                        label="Account Email"
                        class="mt-1"
                        v-model="email"
                        :error-messages="email_errors"
                        autofocus
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
                <v-checkbox
                        label="Remember Me"
                        v-model="remember"
                        color="primary"
                ></v-checkbox>
                <v-btn primary @click="login">Login</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                context: 'login context',
                email: '',
                email_errors: [],
                password: '',
                password_errors: [],
                remember: false
            }
        },
        methods: {
            login() {
                let data = {
                    email: this.email,
                    password: this.password,
                };
                this.email_errors = [];
                this.password_errors = [];
                this.$auth.login({
                    body: data,
                    data: data,
                    rememberMe: this.remember,
                    fetchUser: true,
                    success(response) {
                        this.$store.commit('page/toast', response.data.msg);
                    },
                    error(error) {
                        if (error.response.status === 400) {
                            this.email_errors = [error.response.data.msg + '. Is the email correct?'];
                            this.password_errors = [error.response.data.msg + '. Is the password correct?'];
                            this.$store.commit('page/toast', error.response.data.msg);
                        } else if (error.response.status === 422) {
                            this.email_errors = error.response.data.email;
                            this.password_errors = error.response.data.password;
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
