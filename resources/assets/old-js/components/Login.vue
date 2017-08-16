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
                    remember: this.remember
                };
                this.$auth.login({
                    params: {},
                    success: function () {
                        console.log('Success' + this.context);
                    },
                    error: function () {
                        console.log('Error' + this.context);
                    },
                    rememberMe: this.remember,
                    redirect: '/dashboard',
                });
                /*
                this.axios.post('/api/login', data)
                    .then((result) => {
                        console.log(result);
                        this.email_errors = [];
                        this.password_errors = [];
                        this.$store.commit('setToast', result.data.status);
                        if (result.data.success) {

                        } else {

                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.email_errors = error.response.data.email;
                            this.password_errors = error.response.data.password;
                        }
                    });
                */
            },
        }
    }
</script>
