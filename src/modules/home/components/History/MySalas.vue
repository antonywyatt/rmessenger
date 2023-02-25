<template>
    <div v-if="isSalas.length" class="">
        <div v-for="sala in isSalas" :key="sala">
                <div @click="selectSala(sala.sala_id), chat_existe = true, openSidebar = false" 
                    :class="{'bg-zinc-100 dark:bg-zinc-900' : sala.sala_id == active_sala}"
                    class="flex flex-wrap cursor-default border-b py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:border-zinc-700">     
                    <div class="w-2/3">
                        <h1 class="font-medium dark:text-white">{{ sala.username }}</h1>
                        <p class="text-sm text-zinc-500">{{ sala.sala.text }}</p>
                    </div>
                    <div class="w-1/3 text-right">
                        <p class="text-xs text-zinc-400 dark:text-zinc-600 w-full ">{{ sala.sala.created_at.substr(-30, 8) }}</p>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHome } from '../../composables/useHome';
import { useSalas } from '../../composables/useSalas';

const {
    getSalas,
    isSalas,
    selectSala,
    active_sala
} = useSalas()

const {
    chat_existe,
    openSidebar
} = useHome()

onMounted(() => {
    getSalas()
})

</script>