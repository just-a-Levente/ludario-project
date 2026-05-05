<script setup lang="ts">
defineProps<{ isTransitionActive: boolean }>()
</script>

<template>
  <div class="relative h-dvh">
    <div class="relative z-20 m-4 flex flex-col items-center justify-center gap-y-3 md:pt-10">
      <div class="flex flex-col items-center gap-y-5">
        <img src="/src/assets/images/logo_with_title.png" alt="Ludario logo" />
        <span class="py-3 text-center text-lg font-bold md:text-2xl">
          An online board game shop for newcomers and veterans alike
        </span>
      </div>
      <slot />
    </div>
    <div class="fixed bottom-0 z-10 flex w-dvw flex-row">
      <img src="/src/assets/images/bottom_hexagons_updated.png" class="md:hidden" />
      <img src="/src/assets/images/bottom_hexagons_full.png" class="hidden md:inline" />
    </div>
    <div
      class="fixed inset-0 z-50 border-t-8 border-t-orange-600 bg-slate-500 transition-transform duration-700 ease-in-out"
      :class="isTransitionActive ? 'translate-y-0' : 'translate-y-full'"
    />
  </div>
</template>
