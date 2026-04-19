<script setup lang="ts">
import TheNavBar from './TheNavBar.vue'
</script>

<template>
  <div class="flex h-dvh w-dvw flex-row items-stretch">
    <div class="w-64 shrink-0">
      <TheNavBar />
    </div>
    <div class="min-w-0 flex-1 overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>
