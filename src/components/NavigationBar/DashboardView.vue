<script setup lang="ts">
import TheNavBar from './TheNavBar.vue'
import { ref, onMounted } from 'vue'

const isIntroTransitionActive = ref(true)
const introTransitionDuration = 700

onMounted(() => {
  setTimeout(() => {
    isIntroTransitionActive.value = false
  }, introTransitionDuration)
})
</script>

<template>
  <div class="flex h-dvh w-dvw flex-col items-stretch lg:flex-row">
    <div class="shrink-0 sm:w-full lg:w-64">
      <TheNavBar />
    </div>
    <div class="min-w-0 flex-1 overflow-y-scroll">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
    <div class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div
        class="h-full w-full origin-center border-b-8 border-b-orange-600 bg-slate-500 transition-transform duration-700 ease-in-out"
        :class="
          isIntroTransitionActive ? 'translate-y-0 scale-y-100' : '-translate-y-full scale-y-50'
        "
      ></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

@media (width >= 64rem) {
  .fade-enter-from {
    transform: translateX(10px);
  }

  .fade-leave-to {
    transform: translateX(-10px);
  }
}

@media (width < 64rem) {
  .fade-enter-from {
    transform: translateY(10px);
  }

  .fade-leave-to {
    transform: translateY(-10px);
  }
}
</style>
