<script setup>
import { onMounted } from 'vue'
import { useAuth } from './modules/auth/composables/useAuth'
import { useHome } from './modules/home/composables/useHome'

    const {
      setUser
    } = useAuth()

    const {
      isDarkMode,
      checkDarkMode,
    } = useHome()

    // supabase
    //   .channel('any')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'post' }, payload => {
    //     console.log('Change received!', payload)
    //   })
    //   .subscribe()
    
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
