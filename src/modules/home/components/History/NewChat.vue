<template>
    <div class="py-4 text-center">
        <button @click="new_chat = true" class="px-2 text-zinc-800 dark:text-white">
            <fa :icon="['far', 'pen-to-square']"/> Nuevo chat
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHome } from '../../composables/useHome';
import Modal from '../Modal.vue';

const {
    new_chat
} = useHome()

</script>