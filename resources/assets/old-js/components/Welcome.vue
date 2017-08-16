<template>
    <div class="center">
        <h1 class="display-3">{{ this.$store.state.title }}</h1>
        <h2 class="display-1">{{ this.$store.state.description }}</h2>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
    }
</script>
