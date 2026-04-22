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
  <div
    class="flex h-auto flex-col items-center gap-y-2 border-b-8 border-b-slate-500 bg-orange-300 p-3 sm:flex-row sm:justify-between sm:gap-x-4 sm:p-4 lg:mr-6 lg:h-dvh lg:flex-col lg:items-end lg:justify-normal lg:gap-y-3 lg:border-r-8 lg:border-b-0 lg:border-r-slate-500 lg:px-4 lg:py-6"
  >
    <img src="/logo_with_title.png" alt="Ludario logo" class="w-40 sm:w-48 lg:w-56 lg:pb-6" />

    <div class="flex flex-col items-end sm:flex-row lg:flex-col lg:items-end">
      <div @click="clickCatalogue" class="flex flex-row items-center gap-x-1.5">
        <span class="p-2 text-lg lg:text-2xl">Catalogue</span>
        <div class="w-14 lg:w-18">
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
        <span class="p-2 text-lg lg:text-2xl">Charts</span>
        <div class="w-14 lg:w-18">
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
        <span class="p-2 text-lg lg:text-2xl">Explore</span>
        <div class="w-14 lg:w-18">
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
  </div>
</template>
