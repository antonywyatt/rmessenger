<template>
    
    <div 
        class="hidden md:inline max-h-screen overflow-y-auto justify-between w-full md:w-1/4 dark:bg-zinc-800 border-r dark:border-zinc-600">
        <Header />
    </div>
    <div v-if="openHistory" class="md:hidden h-screen w-full absolute bg-white dark:bg-zinc-800 border-r dark:border-zinc-600">
        <Header />
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import Header from './History/Header.vue';

const props = defineProps({
    isActiveChat: Boolean,
    openHistory: Boolean
})


const isLoading = ref(false)
const openModal = ref(false)

</script>