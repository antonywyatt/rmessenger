<template>
    <Modal
        :showing="openModal"
        @close="openModal = false"
        >
        <h1 class="font-black text-xl text-zinc-800 dark:text-white">Crear chat</h1>
        <form @submit.prevent="onSubmit()" class="my-2 space-y-2">
            <div class="">
                <!-- <label for="name" class="text-sm text-zinc-700 dark:text-zinc-300">Nombre</label> -->
                <input v-model="group.name" type="text" placeholder="Nombre de chat" class="py-2 w-full rounded-lg outline-none px-2 dark:bg-zinc-900 border dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-teal-500">
            </div>
            <div class="">
                <!-- <label for="name" class="text-sm text-zinc-700 dark:text-zinc-300">Descripción</label> -->
                <textarea v-model="group.description" placeholder="Breve descripción del chat" name="" id="" cols="30" rows="4" class="py-2 w-full rounded-lg outline-none px-2 dark:bg-zinc-900 border dark:text-white dark:border-zinc-700 focus:ring-2 focus:ring-teal-500"></textarea>
            </div>
            <div class="flex justify-end items-center">
                <div class="flex space-x-2">
                    <button
                        :class="{'opacity-50' : isLoading}"
                        :disabled="isLoading" 
                        class="px-4 font-medium py-2 rounded-lg bg-teal-500 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-800 text-white">Crear</button>
                    <button type="button" @click="openModal = false" class="px-4 font-medium py-2 rounded-lg border border-zinc-300 dark:text-zinc-300 dark:border-zinc-800">Cancelar</button>
                </div>
            </div>
        </form>
    </Modal>
    <div 
        class="hidden md:inline max-h-screen overflow-y-auto justify-between w-full md:w-1/4 dark:bg-zinc-800 border-r dark:border-zinc-600">
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
import { defineProps, ref } from 'vue';
import { useChat } from '../composables/useChat';
import Chats from './History/Chats.vue';
import Header from './History/Header.vue';
import Modal from './Modal.vue';

const props = defineProps({
    isActiveChat: Boolean,
    openHistory: Boolean
})

const {
    postConvesation
} = useChat()

const isLoading = ref(false)
const openModal = ref(false)
const group = ref({
    name: '',
    description: ''
})


const onNewChat = async () => {
    openModal.value = true
}

const onSubmit = async () => {
    isLoading.value = true
    await postConvesation(group.value).then(resp => {
        console.log(resp)
        openModal.value = false
        isLoading.value = false
    })
}

</script>