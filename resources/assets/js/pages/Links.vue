<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card class="card--flex-toolbar">
                <v-toolbar flat card class="white">
                    <v-toolbar-title class="subheading">All links</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="refreshLinks">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-data-table
                    v-bind:headers="headers"
                    :items="$store.state.links.links"
                    :loading="loading"
                    :rows-per-page-items="[10, 25, 50]"
                >
                    <template slot="items" scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.slug }}</td>
                        <td>{{ props.item.url }}</td>
                        <td>{{ props.item.original }}</td>
                        <td>{{ props.item.views }}</td>
                        <td>{{ props.item.created_at }}</td>
                        <td>
                            <v-btn icon :href="props.item.url">
                                <v-icon>link</v-icon>
                            </v-btn>
                            <v-btn icon :to="{ name: 'link', params: { id: props.item.id } }">
                                <v-icon>show_chart</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                headers: [
                    { text: 'Link ID ', align: 'left', sortable: false },
                    { text: 'Link slug ', align: 'left', sortable: false },
                    { text: 'Shortened URL ', align: 'left', sortable: false },
                    { text: 'Original URL ', align: 'left', sortable: false },
                    { text: 'Views ', align: 'left', sortable: false },
                    { text: 'Creation date ', align: 'left', sortable: false },
                    { text: 'Actions', align: 'left', sortable: false },
                ],
            }
        },
        methods: {
            refreshLinks() {
                this.loading = true;
                this.$store.dispatch('links/updateLinks').then(() => {
                    this.loading = false;
                    this.$store.commit('page/toast', 'Links updated');
                });
            }
        },
        created() {
            this.loading = true;
            this.$store.dispatch('links/updateLinks').then(() => {
                this.loading = false;
            });
        }
    }
</script>
