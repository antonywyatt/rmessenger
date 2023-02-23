<template>
    <div class="flex flex-wrap min-h-screen dark:bg-zinc-900">
        <History 
            :is-active-chat="isActiveChat"
            :open-history="open"/>
        <div class="w-full md:w-3/4">
            <div class="container mx-auto md:px-10 px-4 h-screen ">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import History from '../components/History.vue';
import { useHome } from '../composables/useHome';

const {
    isActiveChat
} = useHome()

const open = ref(false)

</script>