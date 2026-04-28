<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useBoardgames } from '@/api_services/api_queries'
import Chart from 'primevue/chart'

const { data: boardgames } = useBoardgames()

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 800,
    easing: 'easeOutQuart',
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        maxRotation: 90,
      },
    },
  },
}

function producersBoardgameCount(): { name: string; count: number }[] {
  const producerMap: Record<string, number> = {}

  ;(boardgames.value || []).forEach((game) => {
    producerMap[game.producer] = (producerMap[game.producer] || 0) + game.numberOfCopies
  })

  return Object.entries(producerMap).map(([name, count]) => ({ name, count }))
}

function tagsBoardgameCount(): { name: string; count: number }[] {
  const tagMap: Record<string, number> = {}

  ;(boardgames.value || []).forEach((game) => {
    game.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + game.numberOfCopies
    })
  })

  return Object.entries(tagMap).map(([name, count]) => ({ name, count }))
}

const producerChartData = computed(() => {
  if (!boardgames.value) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] }

  const producers = producersBoardgameCount()

  return {
    labels: producers.map((p) => p.name),
    datasets: [
      {
        label: '',
        data: producers.map((p) => p.count),
        backgroundColor: producers.map((_, i) => {
          const hue = (i * 60) % 360
          return `hsl(${hue}, 70%, 60%)`
        }),
      },
    ],
  }
})

const tagsChartData = computed(() => {
  if (!boardgames.value) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] }

  const tags = tagsBoardgameCount()

  return {
    labels: tags.map((p) => p.name),
    datasets: [
      {
        label: '',
        data: tags.map((p) => p.count),
        backgroundColor: tags.map((_, i) => {
          const hue = (i * 60) % 360
          return `hsl(${hue}, 70%, 60%)`
        }),
      },
    ],
  }
})

function startFaker() {}

function stopFaker() {}
</script>

<template>
  <div
    class="flex aspect-4/3 w-full flex-col gap-y-4 self-center p-8 sm:aspect-16/10 md:aspect-video lg:aspect-2/1 lg:w-3/4 lg:items-start"
  >
    <div class="text-2xl md:text-3xl">Top 5 producers by number of copies</div>
    <Chart class="h-full w-full" type="bar" :data="producerChartData" :options="chartOptions" />
    <div class="text-2xl md:text-3xl">Top 5 tags by number of copies</div>
    <Chart class="h-full w-full" type="bar" :data="tagsChartData" :options="chartOptions" />
    <button
      class="rounded-lg bg-slate-500 px-2 py-0.5 text-2xl text-slate-200 hover:bg-slate-600 active:bg-slate-800"
      @click="startFaker"
    >
      Start Faker
    </button>
    <button
      class="rounded-lg bg-slate-500 px-2 py-0.5 text-2xl text-slate-200 hover:bg-slate-600 active:bg-slate-800"
      @click="stopFaker"
    >
      Stop Faker
    </button>
  </div>
</template>
