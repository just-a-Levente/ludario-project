<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useBoardGamesStore } from '@/stores/boardgamestore'

const route = useRoute()
const router = useRouter()

const boardgameStore = useBoardGamesStore()

const detailedBoardgame = computed(() => {
  const idNum = Number.parseInt(route.params.id)
  return boardgameStore.getBoardGameByID(idNum)
})
const tagList = computed(() => {
  const idNum = Number.parseInt(route.params.id)
  return boardgameStore.getBoardGameByID(idNum)?.tags.join(', ')
})

function goBackToCatalogue() {
  router.push('/dashboard/boardgames')
}
</script>

<template>
  <div class="flex w-full flex-col justify-center gap-y-3 overflow-y-scroll p-6 text-lg lg:w-4/5">
    <button @click="goBackToCatalogue" class="self-end">← Back</button>
    <div class="flex flex-col gap-y-12 rounded-2xl border-8 border-slate-500 bg-orange-300 p-5">
      <div class="flex flex-col items-center gap-4 gap-x-8 lg:flex-row">
        <img
          :src="detailedBoardgame?.thumbnailURL"
          alt="Boardgame thumbnail"
          class="w-full lg:w-1/3"
        />
        <div class="flex w-full flex-col items-center gap-y-3 lg:w-2/3 lg:items-start lg:gap-y-0">
          <div class="text-2xl font-bold lg:text-3xl">{{ detailedBoardgame?.name }}</div>
          <div class="pb-8 text-xl lg:text-2xl">{{ detailedBoardgame?.producer }}</div>
          <div class="text-2xl font-bold">{{ detailedBoardgame?.price }} RON</div>
          <div>{{ detailedBoardgame?.numberOfCopies }} copies</div>
          <div>
            {{ detailedBoardgame?.minNumberOfPlayers }} -
            {{ detailedBoardgame?.maxNumberOfPlayers }} players
          </div>
          <div>Tags: {{ tagList }}</div>
        </div>
      </div>
      <div>{{ detailedBoardgame?.description }}</div>
    </div>
  </div>
</template>
