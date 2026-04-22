<script setup lang="ts">
import { watch, ref } from 'vue'
import { createBoardGame } from '@/data/boardgame'
import { useBoardGamesStore } from '@/stores/boardgamestore'
import Chart from 'primevue/chart'

const store = useBoardGamesStore()
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

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

const producerChartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: '',
      data: [] as number[],
      backgroundColor: [] as string[],
    },
  ],
})

function producersBoardgameCount(): { name: string; count: number }[] {
  const producerMap: Record<string, number> = {}

  store.boardgames.forEach((game) => {
    producerMap[game.producer] = (producerMap[game.producer] || 0) + game.numberOfCopies
  })

  return Object.entries(producerMap).map(([name, count]) => ({ name, count }))
}

const tagsChartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: '',
      data: [] as number[],
      backgroundColor: [] as string[],
    },
  ],
})

function tagsBoardgameCount(): { name: string; count: number }[] {
  const tagMap: Record<string, number> = {}

  store.boardgames.forEach((game) => {
    game.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + game.numberOfCopies
    })
  })

  return Object.entries(tagMap).map(([name, count]) => ({ name, count }))
}

watch(
  () => store.boardgames,
  () => {
    const producers = producersBoardgameCount()

    producerChartData.value.labels = producers.map((p) => p.name)
    producerChartData.value.datasets[0].data = producers.map((p) => p.count)

    // dynamic colors (nice touch)
    producerChartData.value.datasets[0].backgroundColor = producers.map((_, i) => {
      const hue = (i * 60) % 360
      return `hsl(${hue}, 70%, 60%)`
    })
  },
  { immediate: true, deep: true },
)

watch(
  () => store.boardgames,
  () => {
    const tags = tagsBoardgameCount()

    tagsChartData.value.labels = tags.map((p) => p.name)
    tagsChartData.value.datasets[0].data = tags.map((p) => p.count)

    // dynamic colors (nice touch)
    tagsChartData.value.datasets[0].backgroundColor = tags.map((_, i) => {
      const hue = (i * 60) % 360
      return `hsl(${hue}, 70%, 60%)`
    })
  },
  { immediate: true, deep: true },
)

async function addFakeBoardgames() {
  const maxNumberOfBoardgames = 100
  let currBoardgame = 0

  const maxNumberOfCopies = 10
  const testTags = tagsBoardgameCount()
    .slice(0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((tag) => tag.name)
  const testProducers = producersBoardgameCount()
    .slice(0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((producer) => producer.name)

  while (currBoardgame < maxNumberOfBoardgames) {
    const currID = store.getLastID()

    const randomTagIndex = Math.floor(Math.random() * testTags.length)
    const randomProducerIndex = Math.floor(Math.random() * testProducers.length)

    store.addBoardGame(
      createBoardGame({
        id: currID,
        hidden: true,
        name: 'Test' + currBoardgame,
        producer: testProducers[randomProducerIndex],
        description: 'Description' + currBoardgame,
        price: 4.99,
        numberOfCopies: Math.floor(Math.random() * maxNumberOfCopies),
        minNumberOfPlayers: 1,
        maxNumberOfPlayers: 1,
        thumbnailURL: 'idk',
        tags: [testTags[randomTagIndex]],
        stars: [],
      }),
    )

    currBoardgame += 1
    await delay(5000)
  }
}
</script>

<template>
  <div
    class="flex aspect-4/3 w-full flex-col gap-y-4 p-8 sm:aspect-16/10 md:aspect-video md:w-3/4 lg:aspect-2/1 lg:w-2/3"
  >
    <div class="text-2xl md:text-3xl">Top 5 producers by number of copies</div>
    <Chart class="h-full w-full" type="bar" :data="producerChartData" :options="chartOptions" />
    <div class="text-2xl md:text-3xl">Top 5 tags by number of copies</div>
    <Chart class="h-full w-full" type="bar" :data="tagsChartData" :options="chartOptions" />
    <button
      class="rounded-lg bg-slate-500 px-2 py-0.5 text-2xl text-slate-200 hover:bg-slate-600 active:bg-slate-800"
      @click="addFakeBoardgames"
    >
      Add board games
    </button>
  </div>
</template>
