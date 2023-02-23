<template>
    <div class="w-full px-2 py-4 sticky top-0">
        <div class=" flex justify-between items-center">
            <div class="flex space-x-2">
                <h1 class="font-black text-xl text-zinc-700 dark:text-zinc-200">Chats</h1>
                <button
                    @click="setDarkMode()" class="text-zinc-700 dark:text-zinc-200">
                    <fa v-if="isDarkMode" icon="sun"/>
                    <fa v-else icon="moon"/>
                </button>
            </div>
            <button>
                <img class="rounded-full h-8" :src="isUser.avatar_url"/>
            </button>
        </div>
        <div class="mt-4">
            <button @click="onNewChat()" class="bg-teal-500 dark:bg-teal-700 shadow-md shadow-teal-100 dark:shadow-none rounded-md text-white w-full py-2 hover:bg-teal-600"><fa icon="pen-to-square"/> Nuevo chat</button>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '../../../auth/composables/useAuth';
import { useHome } from '../../composables/useHome';
const emits = defineEmits(['new_chat'])

const onNewChat = () => {
    emits('new_chat')
}

const {
    isUser
} = useAuth()

const {
    setDarkMode,
    isDarkMode
} = useHome()

</script>