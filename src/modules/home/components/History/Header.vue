<template>
    <Modal
        :showing="open"
        @close="open = false">
        <div class="p-4">
            <h1 class="font-black text-xl text-zinc-800 dark:text-white">Configuración</h1>
            <div class="mt-4">
                <button @click="logout()" class="w-full text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 py-2 border dark:border-zinc-500 rounded-md">
                    <fa icon="power-off"/> Cerrar sesión
                </button>
            </div>
        </div>
    </Modal>
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
            <button
                @click="open = true">
                <img v-if="isUser.avatar_url" class="rounded-full h-8" :src="isUser.avatar_url"/>
                <div v-else class="rounded-full h-8 w-8 uppercase flex justify-center items-center bg-zinc-200 dark:bg-zinc-800">
                    😎
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../../auth/composables/useAuth';
import { useHome } from '../../composables/useHome';
import Modal from '../Modal.vue';

const router = useRouter()
const open = ref(false)

const {
    isUser,
    logout
} = useAuth()


const {
    setDarkMode,
    isDarkMode
} = useHome()

</script>