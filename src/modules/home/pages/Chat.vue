<template>
    <div class="h-screen flex items-end">
        <div class="w-full" ref="refChat">
            <div class="max-h-screen w-full overflow-y-auto">
                <div v-if="mensajes.length">
                    <div v-for="mensaje in mensajes" :key="mensaje" :class="{'flex justify-end' : isUsuario.user_id == mensaje.user_id}" class="flex justify-start">
                        <Mensaje 
                            :mensaje="mensaje"  
                            :is-usuario="isUsuario"  
                        />
                    </div>
                </div>
            </div>
            <form @submit.prevent="sendMensaje()" class="flex bg-zinc-100 dark:bg-zinc-800 px-4 rounded-md space-x-2 py-4">
                <input 
                    type="text" 
                    required 
                    v-model="mensaje.mensaje" 
                    class="w-full p-2 outline-none dark:bg-zinc-900 dark:text-white border-b-2 rounded-md dark:border-zinc-700 dark:focus:border-emerald-500 focus:border-emerald-500"
                    placeholder="Escribe un mensaje">
                <button class="bg-black text-white px-2 rounded-md">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import {useMessage} from '../composables/useMessage'
import { useSalas } from '../composables/useSalas';
import Mensaje from './Mensaje.vue';
import { useAuth } from '../../auth/composables/useAuth';

const {
    active_sala
} = useSalas()

const refChat = ref(null)

const {
    getMensajes,
    mensajes,
    mensaje,
    sendMensaje,
} = useMessage()

const downScroll = () => {
    if(refChat.value){
        setTimeout(() => {
            window.scrollTo(0, refChat.value.scrollHeight)
        }, 100)
    }
}

const {
    isUsuario
} = useAuth()

watch(
    () => active_sala.value,
    () => {
        mensaje.value.sala_id = active_sala.value
        getMensajes(active_sala.value)
        downScroll()
    }
)

onMounted(() => {
    getMensajes(localStorage.getItem('_c_'))
    mensaje.value.sala_id = localStorage.getItem('_c_')
    downScroll()
})

</script>