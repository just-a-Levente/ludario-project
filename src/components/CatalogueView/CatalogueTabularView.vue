<script setup lang="ts">
import { ref } from 'vue'
import { useBoardGamesStore } from '@/stores/boardgames.ts'
import BoardGameListItem from '@/components/CatalogueView/BoardGameListItem.vue'
import AddBoardGameModal from '../AddBoardGame/AddBoardGameModal.vue'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'

const store = useBoardGamesStore()
const { open } = useAddBoardGameModal()

const visibleBoardGamesOnPage = 7

const page = ref(0)
const totalPages = Math.ceil(store.boardgames.length / visibleBoardGamesOnPage)

const visibleBoardGames = ref(store.boardgames.slice(0, visibleBoardGamesOnPage))

function getStartingPage() {
  page.value = 0
  visibleBoardGames.value = store.boardgames.slice(0, visibleBoardGamesOnPage)
}

function getEndingPage() {
  page.value = totalPages - 1
  visibleBoardGames.value = store.boardgames.slice((totalPages - 1) * visibleBoardGamesOnPage)
}

function getPreviousPage() {
  if (page.value == 0) page.value = totalPages - 1
  else page.value--

  const startingBoardGame = page.value * visibleBoardGamesOnPage
  visibleBoardGames.value = store.boardgames.slice(
    startingBoardGame,
    startingBoardGame + visibleBoardGamesOnPage,
  )
}

function getNextPage() {
  if (page.value == totalPages - 1) page.value = 0
  else page.value++

  const startingBoardGame = page.value * visibleBoardGamesOnPage
  visibleBoardGames.value = store.boardgames.slice(
    startingBoardGame,
    startingBoardGame + visibleBoardGamesOnPage,
  )
}

function showAddModal() {
  open()
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-between p-12">
    <div class="flex flex-col gap-y-4">
      <div v-for="boardgame in visibleBoardGames" :key="boardgame.id">
        <BoardGameListItem :boardgame="boardgame" />
      </div>
    </div>
    <div class="items-between flex flex-row gap-x-24">
      <div>
        <button
          class="rounded-lg bg-slate-500 px-2 py-0.5 text-2xl text-slate-200 hover:bg-slate-600 active:bg-slate-800"
          @click="showAddModal"
        >
          + Add boardgame
        </button>
      </div>
      <div class="flex flex-row gap-x-3 text-2xl">
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getStartingPage"
        >
          <<
        </button>
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getPreviousPage"
        >
          <
        </button>
        <div>{{ page + 1 }} / {{ totalPages }}</div>
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getNextPage"
        >
          >
        </button>
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getEndingPage"
        >
          >>
        </button>
      </div>
    </div>
  </div>

  <AddBoardGameModal />
</template>
