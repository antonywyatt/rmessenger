<template>
    <div class="w-full h-screen bg-gradient-to-br from-emerald-500 via-emerald-300 to-emerald-400 flex items-center justify-center">
        <div class="bg-white shadow-md w-full sm:W-1/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-2 p-4 rounded-lg space-y-2">
            <div class="space-y-2">
                <h1 class="font-black text-2xl">Login</h1>
                <p class="text-sm text-gray-600">Hola bienvenido a RMessenger v0.1 😊</p>
                <button
                    @click="onGoogle"
                    :class="{'opacity-50' : isLoading}"
                    :disabled="isLoading" 
                    class="w-full border py-2 rounded-md shadow-md shadow-fuchsia-100 bg-black hover:bg-zinc-900 text-white transition-all duration-300">
                    <fa :icon="['fab','google']"/>
                    Acceder con Google
                </button>
            </div>
            <div class="pt-2 text-center">
                <p class="text-xs text-gray-400">RMessenger es una aplicación de mensajeria desentralizada gratis</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { supabase } from '../../../supabase'

const isLoading = ref(false)

const onGoogle = async () => {
    isLoading.value = true
    const { data: user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

</script>