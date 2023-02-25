<template>
    <div>
        <h1>CHAT DINAMICO</h1>
        <div v-if="mensajes.length">
            <h1 v-for="mensaje in mensajes" :key="mensaje">{{ mensaje.mensaje }}</h1>
        </div> 
        <form @submit.prevent="sendMensaje()">
            <input type="text" required v-model="mensaje.mensaje" placeholder="Mensaje">
            <button>Enviar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import {useMessage} from '../composables/useMessage'
import { useSalas } from '../composables/useSalas';

const route = useRoute()

const {
    active_sala
} = useSalas()

const {
    getMensajes,
    mensajes,
    mensaje,
    sendMensaje,
} = useMessage()

watch(
    () => active_sala.value,
    () => {
        mensaje.value.sala_id = active_sala.value
        getMensajes(active_sala.value)
    }
)

onMounted(() => {
    getMensajes(localStorage.getItem('_c_'))
    mensaje.value.sala_id = localStorage.getItem('_c_')
})

</script>