<script setup lang="ts">
import TheNavBar from './TheNavBar.vue'
</script>

<template>
  <div class="flex h-dvh w-dvw flex-col items-stretch lg:flex-row">
    <div class="shrink-0 sm:w-full lg:w-64">
      <TheNavBar />
    </div>
    <div class="min-w-0 flex-1 overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>
