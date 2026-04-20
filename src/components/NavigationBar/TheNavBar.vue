<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const catalogueButtonActive = ref(true)
const chartsButtonActive = ref(false)
const exploreButtonActive = ref(false)

function clickCatalogue() {
  catalogueButtonActive.value = true
  chartsButtonActive.value = false
  exploreButtonActive.value = false
  router.push('/dashboard/boardgames')
}
function clickCharts() {
  catalogueButtonActive.value = false
  chartsButtonActive.value = true
  exploreButtonActive.value = false
  router.push('/dashboard/charts')
}
function clickExplore() {}
</script>

<template>
  <div class="mr-6 flex h-dvh flex-col items-end gap-y-2 bg-orange-300 py-6">
    <img src="/logo_with_title.png" alt="Ludario logo" class="w-56 pb-6" />

    <div @click="clickCatalogue" class="flex flex-row items-center gap-x-1.5">
      <span class="p-2 text-2xl">Catalogue</span>
      <div class="w-18">
        <img
          :src="
            catalogueButtonActive === true
              ? '/src/assets/navbaricons/blue_hexagon_book.png'
              : '/src/assets/navbaricons/orange_hexagon_book.png'
          "
        />
      </div>
    </div>

    <div @click="clickCharts" class="flex flex-row items-center gap-x-1.5">
      <span class="p-2 text-2xl">Charts</span>
      <div class="w-18">
        <img
          :src="
            chartsButtonActive === true
              ? '/src/assets/navbaricons/blue_hexagon_pie_chart.png'
              : '/src/assets/navbaricons/orange_hexagon_pie_chart.png'
          "
        />
      </div>
    </div>

    <div @click="clickExplore" class="flex flex-row items-center gap-x-1.5">
      <span class="p-2 text-2xl">Explore</span>
      <div class="w-18">
        <img
          :src="
            exploreButtonActive === true
              ? '/src/assets/navbaricons/blue_hexagon_explore.png'
              : '/src/assets/navbaricons/orange_hexagon_explore.png'
          "
        />
      </div>
    </div>
  </div>
</template>
