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
                <img v-if="isUser.avatar_url" class="rounded-full h-8" :src="isUser.avatar_url"/>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '../../../auth/composables/useAuth';
import { useHome } from '../../composables/useHome';

const {
    isUser
} = useAuth()

const {
    setDarkMode,
    isDarkMode
} = useHome()

</script>