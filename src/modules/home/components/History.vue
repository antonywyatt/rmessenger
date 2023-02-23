<template>
    <div v-if="openHistory" class="md:hidden absolute">
        <Chats />
    </div>
    <div 
        class="hidden md:flex w-full md:w-1/4">
        <Chats />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Chats from './History/Chats.vue';

const props = defineProps({
    isActiveChat: Boolean,
    openHistory: Boolean
})

</script>