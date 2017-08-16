<template>
    <v-layout row wrap>
        <v-flex xs12 md6>
            <div class="center">
                <h4 class="title mt-3">Links created</h4>
                <h2>{{ $store.getters['links/linksCount'] }}</h2>
            </div>
        </v-flex>
        <v-flex xs12 md6>
            <div class="center">
                <h4 class="title mt-3">Total views</h4>
                <h2>{{ $store.state.links.totalViews }}</h2>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('links/updateLinks');
            this.$store.dispatch('links/updateViews');
        },
    }
</script>
