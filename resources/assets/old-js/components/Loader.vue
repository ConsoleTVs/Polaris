<template>
    <transition name="fade">
        <v-progress-circular indeterminate v-show="indeterminate" :width="3" class="primary--text"></v-progress-circular>
    </transition>
</template>

<script>
    export default {
        computed: {
            indeterminate() {
                return this.$store.state.loader;
            }
        }
    }
</script>