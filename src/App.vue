<script setup>
import { onMounted } from 'vue'
import { useAuth } from './modules/auth/composables/useAuth'
import { useHome } from './modules/home/composables/useHome'
import { supabase } from './supabase';

    const {
      setUser
    } = useAuth()

    const {
      isDarkMode,
      checkDarkMode,
    } = useHome()
    
    onMounted(() => {
        setUser()
        checkDarkMode()
    })
</script>

<template>
  <div :class="{'dark' : isDarkMode}">
    <router-view></router-view>
  </div>
</template>
