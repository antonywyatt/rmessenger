<template>
    <div 
        class="hidden md:inline justify-between w-full md:w-1/4 dark:bg-zinc-800 border-r dark:border-zinc-600">
        <Header 
            @new_chat="onNewChat()" 
            />
        <Chats />
    </div>
    <div v-if="openHistory" class="md:hidden h-screen w-full absolute bg-white dark:bg-zinc-800 border-r dark:border-zinc-600">
        <Header 
            @new_chat="onNewChat()" 
            />
        <Chats />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Chats from './History/Chats.vue';
import Header from './History/Header.vue';

const props = defineProps({
    isActiveChat: Boolean,
    openHistory: Boolean
})

const onNewChat = async () => {
    console.log('new_chat')
}

</script>