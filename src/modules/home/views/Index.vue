<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="space-y-2">
            <h1 class="text-zinc-500 text-sm dark:text-zinc-300">¡Ups! Parece que no seleccionaste ningun chat</h1>
            <div class="flex md:hidden justify-center">
                <button @click="openSidebar = true" class="bg-black text-white p-2 rounded-md">Abrir chats</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useHome } from '../composables/useHome';

const {
    openSidebar
} = useHome()
</script>