<template>
    <transition name="fade">
        <v-progress-circular indeterminate v-show="$store.state.page.loader" :width="3" class="primary--text"></v-progress-circular>
    </transition>
</template>
