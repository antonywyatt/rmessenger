<template>
    <div  
        class="w-1/2 bg-zinc-200 dark:text-white dark:bg-zinc-800 my-2 rounded-md p-2 shadow-md"
        :class="{'text-zinc-900 bg-emerald-500 dark:bg-emerald-800' : isUsuario.user_id == mensaje.user_id}">
        {{ mensaje.mensaje }}
        <p 
        :class="{'text-zinc-300' : isUsuario.user_id == mensaje.user_id}"
        class="text-xs text-zinc-700 dark:text-zinc-400">{{ mensaje.created_at.substr(11,5) }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    mensaje: Object,
    isUsuario: Object
})
</script>