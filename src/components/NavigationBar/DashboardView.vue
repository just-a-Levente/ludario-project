<script setup lang="ts">
import TheNavBar from './TheNavBar.vue'
</script>

<template>
  <div class="flex h-dvh w-dvw flex-row items-stretch">
    <TheNavBar />
    <RouterView />
  </div>
</template>
