<template>
    <div class="container mx-auto md:px-10 px-4">
        <h1>Chat</h1>
        <p>{{ isUser.email }}</p>
        <button @click="setDarkMode()">darkMode</button>
    </div>
</template>

<script setup>

import { useAuth } from '../../auth/composables/useAuth';
import { useHome } from '../composables/useHome';

const {
    isUser
} = useAuth()

const {
    setDarkMode
} = useHome()

</script>