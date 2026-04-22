<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardGamesStore } from '@/stores/boardgamestore'
import BoardGameListItem from '@/components/CatalogueView/BoardGameListItem.vue'
import AddBoardGameModal from '../BoardGameOpWindows/AddBoardGameModal.vue'
import { useAddBoardGameModal } from '@/composables/useAddBoardGameModal'
import ToggleSwitch from 'primevue/toggleswitch'
import BoardGameCardItem from './BoardGameCardItem.vue'

const store = useBoardGamesStore()
const { open } = useAddBoardGameModal()

const visualViewActive = ref(false)

const visibleBoardGamesOnPage = 7
const visibleBoardGameCardsOnPage = 12

const page = ref(0)
const totalPages = computed(() => {
  if (visualViewActive.value)
    return Math.ceil(store.boardgames.length / visibleBoardGameCardsOnPage)

  return Math.ceil(store.boardgames.length / visibleBoardGamesOnPage)
})

const visibleBoardGames = computed(() => {
  if (visualViewActive.value) {
    const startingBoardGame = page.value * visibleBoardGameCardsOnPage
    return store.boardgames.slice(
      startingBoardGame,
      startingBoardGame + visibleBoardGameCardsOnPage,
    )
  }

  const startingBoardGame = page.value * visibleBoardGamesOnPage
  return store.boardgames.slice(startingBoardGame, startingBoardGame + visibleBoardGamesOnPage)
})

function getStartingPage() {
  page.value = 0
}

function getEndingPage() {
  page.value = totalPages.value - 1
}

function getPreviousPage() {
  if (page.value == 0) page.value = totalPages.value - 1
  else page.value--
}

function getNextPage() {
  if (page.value == totalPages.value - 1) page.value = 0
  else page.value++
}

function showAddModal() {
  open()
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-between p-8">
    <div v-if="visualViewActive === false" class="flex w-11/12 flex-col gap-y-4 overflow-y-scroll">
      <div class="boardgameListItem" v-for="boardgame in visibleBoardGames" :key="boardgame.id">
        <BoardGameListItem :boardgame="boardgame" />
      </div>
    </div>
    <div
      v-if="visualViewActive === true"
      class="flex w-11/12 flex-row flex-wrap justify-center gap-5"
    >
      <div v-for="boardgame in visibleBoardGames" :key="boardgame.id">
        <BoardGameCardItem :boardgame="boardgame" />
      </div>
    </div>
    <div class="flex w-11/12 flex-col items-center justify-evenly gap-4 pt-6 lg:flex-row">
      <div>
        <button
          id="addButton"
          class="rounded-lg bg-slate-500 px-2 py-0.5 text-xl text-slate-200 hover:bg-slate-600 active:bg-slate-800"
          @click="showAddModal"
        >
          + Add boardgame
        </button>
      </div>
      <div class="flex flex-row gap-x-3 text-xl">
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getStartingPage"
        >
          &lt;&lt;
        </button>
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getPreviousPage"
        >
          &lt;
        </button>
        <div>{{ page + 1 }} / {{ totalPages }}</div>
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getNextPage"
        >
          &gt;
        </button>
        <button
          class="rounded-lg bg-orange-300 px-2 py-0.5 hover:bg-orange-500 active:bg-orange-600"
          @click="getEndingPage"
        >
          &gt;&gt;
        </button>
      </div>
      <div class="flex flex-row items-center gap-x-3">
        <div class="primevue-scope">
          <div>Tabular view</div>
          <ToggleSwitch v-model="visualViewActive" />
          <div>Visual view</div>
        </div>
      </div>
    </div>
  </div>

  <AddBoardGameModal />
</template>

<style lang="css" scoped>
.primevue-scope {
  all: revert;
  display: flex;
  flex-direction: row;
  column-gap: calc(var(--spacing) * 3);
}
</style>
