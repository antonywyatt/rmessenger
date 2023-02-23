<template>
    <div class="flex flex-wrap">
        <History 
            :is-active-chat="isActiveChat"
            :open-history="open"/>
        <div class="w-full md:w-3/4 bg-zinc-500">
            <router-view></router-view>
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