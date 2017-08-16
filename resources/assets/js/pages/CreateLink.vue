<template>
    <div class="center">
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-text-field
                        label="Link URL"
                        class="mt-1"
                        type="url"
                        v-model="url"
                        :error-messages="url_errors"
                        autofocus
                        required
                ></v-text-field>
                <v-btn primary @click="create">Create Link</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '',
                url_errors: [],
            }
        },
        methods: {
            create() {
                this.axios.post('api/links/create', { url: this.url })
                .then((response) => {
                    this.$store.commit('page/toast', 'Link created');
                    this.$router.push({name: 'links'});
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.url_errors = error.response.data.url;
                            this.$store.commit('page/toast', "There are errors in the form");
                        } else {
                            this.$store.commit('page/toast', 'Unknown error');
                        }
                    }
                });
            }
        }
    }
</script>
