<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card class="card--flex-toolbar">
                <v-toolbar flat card class="white">
                    <v-toolbar-title class="subheading">Link views</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="refresh">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-data-table
                    v-bind:headers="headers"
                    :items="link.views"
                    :loading="loading"
                    :rows-per-page-items="[10, 25, 50]"
                >
                    <template slot="items" scope="props">
                        <td>{{ props.item.ip }}</td>
                        <td>{{ props.item.os }}</td>
                        <td>{{ props.item.browser }}</td>
                        <td>{{ props.item.lang }}</td>
                        <td>{{ props.item.created_at }}</td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                link: {},
                loading: false,
                headers: [
                    { text: 'IP ', align: 'left', sortable: false, value: 'ip' },
                    { text: 'Operating System ', align: 'left', sortable: false, value: 'os' },
                    { text: 'Browser ', align: 'left', sortable: false, value: 'browser' },
                    { text: 'Language ', align: 'left', sortable: false, value: 'lang' },
                    { text: 'Date ', align: 'left', sortable: false, value: 'created_at' },
                ],
            }
        },
        methods: {
            refresh() {
                this.loading = true;
                this.axios.get('/api/links/' + this.$route.params.id)
                .then((response) => {
                    this.loading = false;
                    this.link = response.data;
                    this.$store.commit('page/toast', 'Information updated');
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            }
        },
        created() {
            this.loading = true;
            this.axios.get('/api/links/' + this.$route.params.id)
            .then((response) => {
                this.loading = false;
                this.link = response.data;
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        }
    }
</script>
