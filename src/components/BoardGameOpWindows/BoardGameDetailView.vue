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
  <div class="flex w-3/5 flex-col justify-center gap-y-3 overflow-y-scroll p-6 text-lg">
    <button @click="goBackToCatalogue" class="self-end">← Back</button>
    <div class="flex flex-col gap-y-12 bg-orange-300 p-5">
      <div class="flex flex-row items-center gap-x-8">
        <img :src="detailedBoardgame?.thumbnailURL" alt="Boardgame thumbnail" class="w-1/3" />
        <div class="flex w-2/3 flex-col">
          <div class="text-3xl font-bold">{{ detailedBoardgame?.name }}</div>
          <div class="pb-8 text-2xl">{{ detailedBoardgame?.producer }}</div>
          <div class="font-bold">{{ detailedBoardgame?.price }} RON</div>
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
