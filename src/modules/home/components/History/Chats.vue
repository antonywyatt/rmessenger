<template>
    <div v-if="isChatHistory.length" class="px-2">
        <div v-for="history in isChatHistory" :key="history" class="flex space-x-2 my-1 items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md cursor-default py-2 px-1">
            <div>
                <img v-if="history.groups?.icono" src="" alt="">
                <div v-else class="h-10 w-10 rounded-full flex justify-center items-center text-white bg-teal-600">
                    {{ history.groups?.name.substr(-100,1).toUpperCase() }}
                </div>
            </div>
            <div>
                <h1 class="font-semibold text-zinc-800 dark:text-zinc-100">{{ history.groups?.name }}</h1>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ history.last_message }}</p>
                <!-- <p class="text-xs text-zinc-400 dark:text-zinc-600">{{ history.last_time.substr(-20,10) }}</p> -->
            </div>
        </div>
    </div>
    <div v-else class="text-center py-8">
        <h1 class="text-zinc-500 text-sm dark:text-zinc-500">No tienes conversaciones aún</h1>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
import { useChat } from '../../composables/useChat';
import { supabase } from '../../../../supabase'

const {
    isChatHistory,
    getChatHistory,
    checkHistory
} = useChat()

onMounted(() => {
    getChatHistory()
    checkHistory()
})

</script>