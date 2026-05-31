<script setup lang="ts">
// import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { onMounted, onUnmounted } from 'vue'
import { useUserStore } from './stores/userstore'
import router from './router'

const INACTIVITY_LIMIT = 15 * 60 * 1000
let inactivityTimer: ReturnType<typeof setTimeout>

function resetTimer() {
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    useUserStore().logout()
    router.push('/login')
  }, INACTIVITY_LIMIT)
}

onMounted(() => {
  ;['mousemove', 'keydown', 'click', 'scroll'].forEach((event) =>
    window.addEventListener(event, resetTimer),
  )
  resetTimer()
})

onUnmounted(() => {
  ;['mousemove', 'keydown', 'click', 'scroll'].forEach((event) =>
    window.removeEventListener(event, resetTimer),
  )
  clearTimeout(inactivityTimer)
})
</script>

<template>
  <div>
    <RouterView />
    <!-- <VueQueryDevtools /> -->
  </div>
</template>
