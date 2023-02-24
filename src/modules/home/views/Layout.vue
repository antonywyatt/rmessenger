<template>
    <!-- new usuario -->
    <Modal
        :showing="!exists">
        <div class="space-y-2 p-4">
            <div class="text-center">
                <h1 class="text-xl font-black text-zinc-800">Activemos tu usuario</h1>
                <p class="text-sm text-zinc-500">Complete este formulario y listo 😁</p>
            </div>
            <form action="" class="pt-2">
                <div class="space-y-1">
                    <label for="" class="text-xs mx-2">Username</label>
                    <input v-model="usuario.username" 
                        type="text" 
                        placeholder="Username" 
                        title="Con este usuario te encontraran tus amigos"
                        class="w-full px-2 py-2 outline-none bg-zinc-100 rounded-md">
                </div>
                <div class="space-y-1">
                    <label for="" class="text-xs mx-2">Estado</label>
                    <textarea v-model="usuario.status" type="text" placeholder="Username" class="w-full px-2 py-2 outline-none bg-zinc-100 rounded-md"></textarea>
                </div>
                <div class="mt-2">
                    <button class="w-full bg-black text-white rounded-md py-2">Activar <fa icon="check-circle"/></button>
                </div>
            </form>
        </div>
    </Modal>
    <div class="flex flex-wrap min-h-screen dark:bg-zinc-900">
        <History 
            :is-active-chat="isActiveChat"
            :open-history="open"/>
        <div class="w-full md:w-2/3">
            <div class="container mx-auto md:px-10 px-4 h-screen ">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../auth/composables/useAuth';
import History from '../components/History.vue';
import Modal from '../components/Modal.vue';
import { useHome } from '../composables/useHome';

const {
    isActiveChat
} = useHome()

const {
    exists,
    usuario
} = useAuth()

const open = ref(false)

</script>